import { Flex, Spacer, RadioGroup, Stack, Radio, useRadio, useRadioGroup } from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { useResponseContext } from '../ResponseContext';
import { OptionDefinition } from './BlockLibrary';
import { useState } from 'react';

interface DropdownBlockProps {
  label: string;
  placeholder?: string;
  field: string;
  fieldRef: string;
  options: OptionDefinition[];
}

export const DropdownBlock = ({ label, fieldRef, placeholder, options }: DropdownBlockProps): JSX.Element => {
  const responseContext = useResponseContext();

  return (
    <Flex alignItems="center" gap="2" p={2}>
      {label && <label className="form-label">{label}</label>}

      <Select
        size="sm"
        color="white"
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          responseContext?.setResponse({
            ...responseContext?.response,
            [fieldRef]: e.target.value,
          });
        }}
        value={responseContext?.response?.[fieldRef]}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Flex>
  );
};
