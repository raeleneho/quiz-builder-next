import { Box, Flex, IconButton, Text, useTabsContext } from '@chakra-ui/react';
import { useStepEditorContext } from './StepEditor/StepEditorContext';
import { DeleteIcon } from '@chakra-ui/icons';
import { useResponseContext } from './ResponseContext';

function ResponsePreview() {
  const responseContext = useResponseContext();
  return (
    <Box pos="relative" borderWidth="1px" borderRadius="md" p="4" bgColor="gray.100">
      <IconButton
        pos="absolute"
        right="0"
        top="0"
        colorScheme="teal"
        aria-label="insert new block"
        fontSize="12px"
        size="xs"
        icon={<DeleteIcon />}
        onClick={() => responseContext?.setResponse({})}
      />
      <Flex>
        <Text color="gray.500">{'{'}</Text>
      </Flex>

      {Object.entries(responseContext?.response ?? {}).map(([key, value]) => {
        return (
          <Box key={key} pl={3}>
            <Flex justifyContent="flex-start">
              <Text fontSize="xs">{`"${key}": "${value}",`}</Text>
            </Flex>
          </Box>
        );
      })}

      <Flex>
        <Text color="gray.500">{'}'}</Text>
      </Flex>
    </Box>
  );
}

export default ResponsePreview;
