import { DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';
import { FormLabel, Flex, IconButton, Button } from '@chakra-ui/react';
import React from 'react';
import { FormInput } from '../FormInput';
import { OptionDefinition } from './BlockLibrary';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';

function SelectBlockSettings() {
  const stepEditorContext = useStepEditorContext();
  const { selectedBlock, setSelectedBlock } = stepEditorContext || {};

  const handleOptionChange = (index: number, field: keyof OptionDefinition, value: string) => {
    if (selectedBlock && setSelectedBlock) {
      setSelectedBlock &&
        setSelectedBlock({
          ...selectedBlock,
          data: {
            ...selectedBlock.data,
            options: selectedBlock.data.options.map((option: OptionDefinition, i: number) => (i === index ? { ...option, [field]: value } : option)),
          },
        });
    }
  };
  const addOption = () => {
    if (selectedBlock && setSelectedBlock) {
      const newOption: OptionDefinition = { label: 'new label', value: 'new value' };
      selectedBlock &&
        setSelectedBlock({
          ...selectedBlock,
          data: {
            ...selectedBlock.data,
            options: [...selectedBlock.data.options, newOption],
          },
        });
    }
  };

  const deleteOption = (index: number) => {
    if (selectedBlock && setSelectedBlock) {
      setSelectedBlock({
        ...selectedBlock,
        data: {
          ...selectedBlock.data,
          options: selectedBlock.data.options.filter((_, i: number) => i !== index),
        },
      });
    }
  };

  return (
    <>
      {selectedBlock &&
        Object.entries(selectedBlock.data).map(([key, value]) =>
          key === 'options' ? (
            <>
              <FormLabel fontSize="sm" mb={0}>
                {key}:
              </FormLabel>
              <Flex flexDir="column" rounded="md" bgColor="gray.200" p={3} gap={3} key={key} justifyContent="space-between">
                {selectedBlock.data.options.map((option: OptionDefinition, index: number) => (
                  <Flex key={index} gap={1}>
                    <FormInput
                      width="auto"
                      size="sm"
                      bgColor="white"
                      boxShadow="sm"
                      borderLeftRadius="md"
                      value={option.label}
                      onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                    />
                    <FormInput
                      width="auto"
                      size="sm"
                      bgColor="white"
                      boxShadow="sm"
                      borderRightRadius="md"
                      value={option.value}
                      onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                    />
                    <IconButton
                      ml={1}
                      colorScheme="teal"
                      fontSize="14px"
                      size="sm"
                      onClick={() => deleteOption(index)}
                      aria-label="delete option"
                      icon={<DeleteIcon />}
                    />
                  </Flex>
                ))}
                <Button alignSelf="flex-start" colorScheme="teal" variant="link" size="sm" onClick={addOption}>
                  <SmallAddIcon />
                  Add option
                </Button>
              </Flex>
            </>
          ) : (
            <Flex key={key} justify="space-between" gap="1">
              <FormLabel fontSize="sm" mb={0}>
                {key}:
              </FormLabel>
              <FormInput
                width="auto"
                size="sm"
                variant="outline"
                boxShadow="sm"
                rounded="md"
                value={selectedBlock.data[key]}
                onChange={(e) =>
                  setSelectedBlock &&
                  setSelectedBlock({
                    ...selectedBlock,
                    data: {
                      ...selectedBlock.data,
                      [key]: e.target.value,
                    },
                  })
                }
              />
            </Flex>
          )
        )}
    </>
  );
}

export default SelectBlockSettings;
