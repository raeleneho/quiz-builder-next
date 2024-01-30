'use client';
import { Box, HStack, Text } from '@chakra-ui/react';
import QuizClient, { quizRoute } from '@components/api/QuizClient';
import { useQuery } from '@tanstack/react-query';
import StepPreview from './StepPreview/StepPreview';

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

  return (
    <>
      <Box bg="gray.600" w="100%" m={4} color="white">
        <Text fontSize="xl">{`"${quizId}"`}</Text>

        {quiz?.steps?.map((stepId: string) => (
          <StepPreview key={stepId} stepId={stepId} quizId={quizId ?? ''} />
        ))}
      </Box>
    </>
  );
}

export default QuizPreview;
