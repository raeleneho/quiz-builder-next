import { Flex, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { FormInput } from '../FormInput';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';

interface InputBlockSettingProps {
  label: string;
  value: string;
  onChange: (data: string) => void;
}

export const InputBlockSetting = ({ label, value, onChange }: InputBlockSettingProps) => {
  return (
    <Flex justify="space-between" gap="1">
      <FormLabel fontSize="sm" mb={0}>
        {label}:
      </FormLabel>
      <FormInput width="auto" size="sm" variant="outline" boxShadow="sm" rounded="md" value={value} onChange={(e) => onChange(e.target.value)} />
    </Flex>
  );
};

function InputBlockSettings() {
  const stepEditorContext = useStepEditorContext();
  const { selectedBlock, setSelectedBlock } = stepEditorContext || {};

  const handleFieldChange = (field: string, fieldValue: string) => {
    if (selectedBlock && setSelectedBlock) {
      const updatedData = { ...selectedBlock.data, [field]: fieldValue };
      setSelectedBlock({ ...selectedBlock, data: updatedData });
    }
  };

  return (
    <>
      {selectedBlock &&
        Object.keys(selectedBlock.data).map((key) => (
          // <Flex key={key} justify="space-between" gap="1">
          //   <FormLabel fontSize="sm" mb={0}>
          //     {key}:
          //   </FormLabel>
          //   <FormInput
          //     width="auto"
          //     size="sm"
          //     variant="outline"
          //     boxShadow="sm"
          //     rounded="md"
          //     value={selectedBlock.data[key]}
          //     onChange={(e) =>
          //       setSelectedBlock &&
          //       setSelectedBlock({
          //         ...selectedBlock,
          //         data: {
          //           ...selectedBlock.data,
          //           [key]: e.target.value,
          //         },
          //       })
          //     }
          //   />
          // </Flex>
          <InputBlockSetting key={key} label={key} value={selectedBlock.data[key]} onChange={(newValue) => handleFieldChange(key, newValue)} />
        ))}
    </>
  );
}

export default InputBlockSettings;
