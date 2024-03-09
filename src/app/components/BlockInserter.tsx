import { BlockClient, BlockType } from '../../api/BlockClient';
import { blockLibrary } from './blocks/BlockLibrary';
import { Box, Button, Flex, Icon } from '@chakra-ui/react';

interface BlockInserterProps {
  // position: number;
  quizId: string;
  stepId: string;
  showIcon?: boolean;
  
}

export const BlockInserter = ({ stepId, quizId, showIcon }: BlockInserterProps) => {
  const addBlock = (blockType: BlockType) => {
    const newBlock = {
      quizId,
      stepId,
      type: blockType,
      // position: position,
      data: blockLibrary[blockType].factory(),
    };

    BlockClient.createBlock(newBlock);
  };

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      {Object.keys(blockLibrary).map((block) => {
        return (
          <Flex py={1} key={block} alignItems="center">
            {showIcon && (
              <Flex alignItems="center" mr={2}>
                {' '}
                {blockLibrary[block as BlockType].iconType}
              </Flex>
            )}

            <Button variant="link" aria-label={`select ${block} block`} onClick={() => addBlock(block as BlockType)}>
              {blockLibrary[block as BlockType].inserterOptions.label}
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
};
