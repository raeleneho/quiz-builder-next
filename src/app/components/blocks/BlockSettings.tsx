// dynamic props - block id, block type, block data
// make getblock request
import { Box, Button, Flex, FormLabel, Spacer } from '@chakra-ui/react';

import { BlockClient, BlockType } from '../../../api/BlockClient';

import { FormInput } from '../FormInput';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';
import CustomEditor from '../CustomEditor';

interface BlockEditorProps {
  stepId: string;
}

export function BlockSettings({ stepId }: BlockEditorProps) {
  const stepEditorContext = useStepEditorContext();
  const block = stepEditorContext?.selectedBlock;
  console.log('step con block', stepEditorContext);

  const handleCustomEditorData = (data: string) => {
    stepEditorContext?.selectedBlock &&
      stepEditorContext?.setSelectedBlock({
        ...stepEditorContext?.selectedBlock,
        data: {
          ...stepEditorContext?.selectedBlock?.data,
          textValue: data,
        },
      });
  };

  if (!block) return <>Select a block</>;

  const blockSettingsRenderer = () => {
    if (block.type === BlockType.TYPOGRAPHY) {
      return <CustomEditor initialData={block.data.textValue} onCustomEditorChange={handleCustomEditorData} />;
    } else {
      return (
        <>
          {Object.keys(stepEditorContext?.selectedBlock?.data ?? {}).map((key) => {
            return (
              <Flex key={key} justify="space-between" gap="1">
                <FormLabel fontSize="sm" mb={0}>
                  {key}:
                </FormLabel>

                <FormInput
                  width="auto"
                  size="sm"
                  variant="outline"
                  boxShadow="sm"
                  rounded="md"
                  value={stepEditorContext?.selectedBlock?.data[key]}
                  onChange={(e) => {
                    stepEditorContext?.selectedBlock &&
                      stepEditorContext?.setSelectedBlock({
                        ...stepEditorContext?.selectedBlock,
                        data: {
                          ...stepEditorContext?.selectedBlock?.data,
                          [key]: e.target.value,
                        },
                      });
                  }}
                />
              </Flex>
            );
          })}
        </>
      );
    }
  };
  return (
    <>
      <Box maxW="350px" display="flex" flexDirection="column" gap={2}>
        {blockSettingsRenderer()}

        <Button
          aria-label="update block"
          colorScheme="teal"
          fontSize="16px"
          size="sm"
          onClick={() =>
            BlockClient.updateBlock({
              stepId,
              ...block,
            })
          }
        >
          Save
        </Button>
        <Button
          aria-label="delete block"
          colorScheme="teal"
          variant="outline"
          fontSize="16px"
          size="sm"
          onClick={() => {
            BlockClient.deleteBlock({ stepId, blockId: block?.id });
            stepEditorContext?.setSelectedBlock(null);
          }}
        >
          Delete block
        </Button>
      </Box>
    </>
  );
}
