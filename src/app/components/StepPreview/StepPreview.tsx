import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';

import './StepPreview.css';
import { blockLibrary } from '../blocks/BlockLibrary';

import { Box, Container, VStack, Text, Center } from '@chakra-ui/react';

import NewBlockPopoverModal from '../NewBlockPopoverModal';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';
import { useTabsContext } from '../Tabs/TabsContext';
import { useState, useEffect } from 'react';
import { Block, BlockClient, blockRoute } from '@api/BlockClient';
import StepClient, { Step, stepRoute } from '@api/StepClient';

interface BlockRendererProps {
  block?: Block | null;
}

export const BlockRenderer = ({ block }: BlockRendererProps): JSX.Element => {
  if (!block) {
    return <></>;
  }
  const BlockComponent = blockLibrary[block?.type]?.block;

  if (!BlockComponent) {
    return <></>;
  }

  return <BlockComponent {...block.data} />;
};

interface StepPreviewProps {
  stepId: string;
  quizId: string;
  editable?: boolean;
}

function StepPreview({ stepId, quizId, editable }: StepPreviewProps) {
  const stepEditorContext = useStepEditorContext();
  const tabContext = useTabsContext();

  const [step, setStep] = useState<Step | null>();

  const { data: stepRes } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      try {
        const step = await StepClient.getStep({ stepId, quizId });

        return step;
      } catch (error) {
        console.error('Error fetching step:', error);
        throw error;
      }
    },
    enabled: !!stepId,
    // placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (stepRes) {
      setStep({ ...stepRes });
    }
  }, [stepRes]);

  const blocksRes = useQueries({
    queries:
      step?.blocks?.map((blockId: string) => {
        return {
          queryKey: [blockRoute, blockId],
          queryFn: async () => {
            return await BlockClient.getBlock({ blockId, stepId: step.id });
          },
        };
      }) ?? [],
  });

  return (
    <>
      {editable ? (
        <VStack py={4}>
          {blocksRes?.map(({ data: block }) => {
            const isSelected = stepEditorContext?.selectedBlockId === block?.id;

            return (
              <Box
                key={block?.id}
                w="100%"
                p={1}
                className={`content-block ${isSelected ? 'content-block-hightlight' : ''}`}
                onClick={() => {
                  if (!isSelected) {
                    stepEditorContext?.setSelectedBlockId(block?.id ?? '');

                    tabContext?.setSelectedTab('2');
                  }
                }}
              >
                <Container centerContent>
                  <Box w="90%">
                    <BlockRenderer block={isSelected ? stepEditorContext?.selectedBlock : block} />
                  </Box>
                </Container>
                <NewBlockPopoverModal triggerIcon stepId={step?.id} quizId={quizId} />
              </Box>
            );
          })}
        </VStack>
      ) : (
        <VStack py={4}>
          {blocksRes?.length <= 0 && (
            <Text color="white"> Good job for creating a new step! Now, click on that step on the left side bar to start adding blocks. </Text>
          )}
          {blocksRes?.map(({ data: block }) => {
            return (
              <Box key={block?.id} p={1}>
                <Container centerContent>
                  <Box w="90%">
                    <BlockRenderer block={block} />
                  </Box>
                </Container>
              </Box>
            );
          })}
        </VStack>
      )}
    </>
  );
}

export default StepPreview;
