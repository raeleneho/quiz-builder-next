'use client';

import { Flex, Button, FormLabel } from '@chakra-ui/react';
import StepClient, { Step, stepRoute } from '../../api/StepClient';

import { FormInput } from './FormInput';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface StepSettingsProps {
  stepId: string;
  quizId: string;
}

function StepSettings({ stepId, quizId }: StepSettingsProps) {
  // const [step, setStep] = useState<Step | null>();

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

  const [stepName, setStepName] = useState(stepRes?.name || '');

  const saveStep = async () => {
    if (stepRes) {
      await StepClient.updateStep({
        ...stepRes,
        name: stepName,
        quizId,
      });
    }
  };

  return (
    <Flex alignItems="center" gap="2">
      <FormLabel mb={0} fontSize="sm">
        Step Name:
      </FormLabel>
      <FormInput
        width="auto"
        size="sm"
        variant="outline"
        boxShadow="sm"
        rounded="md"
        value={stepName}
        onChange={(e) => setStepName(e.target.value)}
      />

      <Button aria-label="update step" colorScheme="teal" fontSize="16px" size="sm" onClick={saveStep}>
        save
      </Button>
    </Flex>
  );
}

export default StepSettings;
