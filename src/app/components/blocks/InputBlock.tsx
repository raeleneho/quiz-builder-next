import { Flex } from '@chakra-ui/react';

import { FormInput } from '../FormInput';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';

import './InputBlock.css';

interface InputBlockProps {
  label: string;
  fieldRef: string;
}

export const InputBlock = ({ label, fieldRef, ...defaultAttrs }: InputBlockProps) => {
  const stepEditorContext = useStepEditorContext();

  console.log('context', stepEditorContext?.formData);
  return (
    <Flex alignItems="center" gap="2" p={2}>
      {label && <label className="form-label">{label}</label>}

      <FormInput
        {...defaultAttrs}
        value={stepEditorContext?.formData?.[fieldRef] ?? ''}
        onChange={(e) =>
          stepEditorContext?.setFormData({
            ...stepEditorContext?.formData,
            [fieldRef]: e.target.value,
          })
        }
      />
    </Flex>
  );
};
