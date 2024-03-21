import { Flex, RadioGroup, Stack, Radio } from '@chakra-ui/react';

import { useResponseContext } from '../../ResponseContext';
import { OptionDefinition } from '../BlockLibrary';

interface SelectBlockProps {
  label: string;
  field: string;
  fieldRef: string;
  options: OptionDefinition[];
}

export const RadioBlock = ({ label, fieldRef, options }: SelectBlockProps) => {
  const responseContext = useResponseContext();

  return (
    <Flex alignItems="center" justifyContent="space-between" p={2}>
      {label && <label className="form-label">{label}</label>}

      <RadioGroup
        defaultValue={options[0].value}
        onChange={(newVal: string) => {
          responseContext?.setResponse({
            ...responseContext?.response,
            [fieldRef]: newVal,
          });
        }}
        value={responseContext?.response?.[fieldRef]}
      >
        <Stack color="white" spacing={[1, 5]} direction="row">
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Flex>
  );
};
