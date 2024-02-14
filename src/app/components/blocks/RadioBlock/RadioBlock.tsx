import { Flex, Spacer, Select, RadioGroup, Stack, Radio, useRadio, useRadioGroup } from '@chakra-ui/react';

import { useResponseContext } from '../../ResponseContext';

interface SelectBlockProps {
  label: string;
  field: string;
  fieldRef: string;
  options: { label: string; value: string }[];
  type?: 'radio' | 'dropdown';
}

export const RadioBlock = ({ label, fieldRef, options }: SelectBlockProps): JSX.Element => {
  const responseContext = useResponseContext();

  return (
    <Flex alignItems="center" justifyContent="space-" p={2} className="radio-block">
      {label && <label className="form-label">{label}</label>}

      <RadioGroup
        onChange={(newVal: string) => {
          responseContext?.setResponse({
            ...responseContext?.setResponse,
            [fieldRef]: newVal,
          });
        }}
        value={responseContext?.response?.[fieldRef]}
      >
        <Stack color="white" direction="row">
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
