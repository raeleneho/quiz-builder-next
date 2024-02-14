// dynamic props - block id, block type, block data
// make getblock request
import { Box, Button, Flex, FormLabel, IconButton, Spacer } from '@chakra-ui/react';
import { AddIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BlockClient, BlockType } from '../../../api/BlockClient';

import { useStepEditorContext } from '../StepEditor/StepEditorContext';

import { OptionDefinition, blockLibrary } from './BlockLibrary';

interface BlockSettingsProps {
  stepId: string;
}

export function BlockSettings({ stepId }: BlockSettingsProps) {
  const stepEditorContext = useStepEditorContext();
  const { selectedBlock, setSelectedBlock } = stepEditorContext || {};

  const BlockSettingsRenderer = () => {
    if (!selectedBlock) return <>Select a block</>;

    const BlockSettingsComponent = blockLibrary[selectedBlock?.type].blockSettings;
    return <BlockSettingsComponent {...selectedBlock?.data} />;
  };

  return (
    <>
      <Box maxW="350px" display="flex" flexDirection="column" gap={2}>
        {BlockSettingsRenderer()}
        <Button
          aria-label="update block"
          colorScheme="teal"
          fontSize="16px"
          size="sm"
          onClick={() =>
            selectedBlock &&
            BlockClient.updateBlock({
              stepId,
              ...selectedBlock,
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
            if (selectedBlock && setSelectedBlock) {
              BlockClient.deleteBlock({ stepId, blockId: selectedBlock.id });
              setSelectedBlock(null);
            }
          }}
        >
          Delete block
        </Button>
      </Box>
    </>
  );
}
