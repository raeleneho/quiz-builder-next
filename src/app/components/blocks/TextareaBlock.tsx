import { Flex, Spacer, Textarea } from '@chakra-ui/react';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';

import './TextareaBlock.css';

interface TextareaBlockProps {
  label: string;
  placeholder: string;
  field: string;
  fieldRef: string;
}

export const TextareaBlock = ({ label, fieldRef, placeholder }: TextareaBlockProps): JSX.Element => {
  const stepEditorContext = useStepEditorContext();
  return (
    <Flex alignItems="center" justify="space-between" p={2}>
      {label ? <label>{label}</label> : <Spacer />}

      <Textarea
        variant="filled"
        className="textarea-block"
        value={stepEditorContext?.formData?.[fieldRef] ?? ''}
        onChange={(e) =>
          stepEditorContext?.setFormData({
            ...stepEditorContext?.formData,
            [fieldRef]: e.target.value,
          })
        }
        placeholder={placeholder}
      ></Textarea>
    </Flex>
  );
};
