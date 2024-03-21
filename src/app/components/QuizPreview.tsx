'use client';
import { Box, Button, Container, Flex, HStack, Spacer, Text } from '@chakra-ui/react';

import { useQuery } from '@tanstack/react-query';
import StepPreview from './StepPreview/StepPreview';
import { useState } from 'react';
import { ServerResponseProvider } from './ResponseContext';
import QuizClient, { quizRoute } from '@api/QuizClient';

interface QuizPreviewProps {
  quizId: string;
}
function QuizPreview({ quizId }: QuizPreviewProps) {
  const { data: quiz } = useQuery({
    queryKey: [quizRoute, quizId],
    queryFn: async () => {
      return await QuizClient.getQuiz(quizId);
    },
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = quiz?.steps?.length;

  const handleNextClick = () => {
    const nextStepIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextStepIndex);
  };

  const handlePreviousClick = () => {
    const prevStepIndex = currentStepIndex - 1;
    setCurrentStepIndex(prevStepIndex);
  };

  return (
    <ServerResponseProvider>
      <Flex h="100vh" w="100%" direction="column" p={6}>
        {totalSteps ? (
          <>
            <Flex>
              <Text as="b" color="white" fontSize="lg">
                {' '}
                Quiz Preview
              </Text>
            </Flex>

            {quiz?.steps?.map((stepId: string, index) => (
              <>
                {index === currentStepIndex && (
                  <>
                    <Text color="white">
                      {' '}
                      step {index + 1} out of {totalSteps}
                    </Text>
                    <StepPreview key={stepId} stepId={stepId} quizId={quizId ?? ''} />
                  </>
                )}
              </>
            ))}

            <Spacer />
            <Flex>
              {currentStepIndex !== 0 && (
                <Button border="2px" colorScheme="" size="lg" onClick={handlePreviousClick}>
                  Back
                </Button>
              )}

              <Spacer />

              {totalSteps && totalSteps - 1 !== currentStepIndex && (
                <Button size="lg" colorScheme="teal" onClick={handleNextClick}>
                  Next
                </Button>
              )}
            </Flex>
          </>
        ) : (
          <Text color="white"> Nothing to preview just yet, start by creating a new step. </Text>
        )}
      </Flex>
    </ServerResponseProvider>
  );
}

export default QuizPreview;
