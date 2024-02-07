'use client';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import QuizClient, { quizRoute } from '@components/api/QuizClient';
import { useQuery } from '@tanstack/react-query';
import StepPreview from './StepPreview/StepPreview';
import { useState } from 'react';
import { ServerResponseProvider } from './ResponseContext';

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

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = quiz?.steps?.length;

  return (
    <ServerResponseProvider>
      <Box w="100%" p={6}>
        <Flex>
          <Text as="b" color="white" fontSize="lg">
            {' '}
            Quiz Preview
          </Text>
        </Flex>

        {quiz?.steps?.map((stepId: string, index) => (
          <>
            <Text color="white">
              {' '}
              step {index + 1} out of {totalSteps}
            </Text>
            <StepPreview key={stepId} stepId={stepId} quizId={quizId ?? ''} />
          </>
        ))}
      </Box>
    </ServerResponseProvider>
  );
}

export default QuizPreview;
