import { Checkbox, CheckboxGroup, Flex, Stack } from '@chakra-ui/react';
import { OptionDefinition } from './BlockLibrary';
import { useResponseContext } from '../ResponseContext';

interface CheckboxBlockProps {
  label: string;
  field: string;
  fieldRef: string;
  options: OptionDefinition[];
}

function CheckboxBlock({ label, fieldRef, options }: CheckboxBlockProps) {
  const responseContext = useResponseContext();

  return (
    <Flex alignItems="center" justifyContent="space-between" p={2}>
      {label && <label className="form-label">{label}</label>}

      <CheckboxGroup
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
      </CheckboxGroup>
    </Flex>
  );
}

export default CheckboxBlock;
