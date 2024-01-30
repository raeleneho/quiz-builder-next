import { useQueries, useQuery } from '@tanstack/react-query';
import { Block, BlockClient, blockRoute } from '../../../api/BlockClient';
import StepClient, { Step, stepRoute } from '../../../api/StepClient';

import './StepPreview.css';
import { blockLibrary } from '../blocks/BlockLibrary';

import { AbsoluteCenter, Box, Container, VStack } from '@chakra-ui/react';

import NewBlockPopoverModal from '../NewBlockPopoverModal';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';
import { useTabsContext } from '../Tabs/TabsContext';
import { useState, useEffect } from 'react';

interface BlockRendererProps {
  block?: Block | null;
  isSelected?: boolean;
}

export const BlockRenderer = ({ block, isSelected }: BlockRendererProps): JSX.Element => {
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
}

function StepPreview({ stepId, quizId }: StepPreviewProps) {
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
  });

  useEffect(() => {
    console.log(stepRes);
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

  // if (blocksRes && blocksRes.length === 1) {

  //   return stepEditorContext?.setSelectedBlockId(blocksRes[0].data?.id);
  // }
  return (
    <>
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
                <Box w="60%">
                  <BlockRenderer block={isSelected ? stepEditorContext?.selectedBlock : block} isSelected={isSelected} />
                </Box>
              </Container>
              <NewBlockPopoverModal triggerIcon stepId={step.id} quizId={quizId} />
            </Box>
          );
        })}
      </VStack>
    </>
  );
}

export default StepPreview;
