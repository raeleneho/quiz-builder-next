import { Checkbox, CheckboxGroup, Flex, Stack, chakra, useCheckbox, Text, useCheckboxGroup } from '@chakra-ui/react';
import { OptionDefinition } from './BlockLibrary';
import { useResponseContext } from '../ResponseContext';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';

interface MultiSelectBlockProps {
  label: string;
  field: string;
  fieldRef: string;
  options: OptionDefinition[];
}

const CustomCheckbox = (props) => {
  const { state, getCheckboxProps, getInputProps, htmlProps, getLabelProps } = useCheckbox(props);

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="36"
      bg={state.isChecked ? 'teal.200' : 'teal.50'}
      border="1px solid"
      borderColor="teal.500"
      rounded="2xl"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      {state.isChecked && (
        <Flex alignItems="center" justifyContent="center" w={4} h={4} {...getCheckboxProps()}>
          <CheckIcon boxSize={3} />
        </Flex>
      )}
      <Text color="gray.700" {...getLabelProps()}>
        {props.label}
      </Text>
    </chakra.label>
  );
};

function MultiSeleckBlock({ label, fieldRef, options }: MultiSelectBlockProps) {
  const responseContext = useResponseContext();

  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: [options[0].value],
    onChange: () => {
      (newVal: (string | number)[]) => {
        responseContext?.setResponse({
          ...responseContext?.response,
          [fieldRef]: newVal,
        });
        console.log('val', newVal);
      };
    },
  });

  return (
    <Flex alignItems="center" justifyContent="space-" p={2}>
      {label && <label className="form-label">{label}</label>}
      <Stack spacing={[1, 5]} direction="row">
        {options.map((option) => (
          <CustomCheckbox key={option.value} {...getCheckboxProps({ value: option.value })} label={option.label} />
        ))}
      </Stack>

      {/* <CheckboxGroup
        colorScheme="teal"
        defaultValue={[options[0].value]}
        onChange={(newVal: (string | number)[]) => {
          responseContext?.setResponse({
            ...responseContext?.response,
            [fieldRef]: newVal,
          });
        }}
        value={responseContext?.response?.[fieldRef]}
      >
        <Stack color="white" spacing={[1, 5]} direction={['column', 'row']}>
          {options.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {' '}
              {option.label}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup> */}
    </Flex>
  );
}

export default MultiSeleckBlock;
