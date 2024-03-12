import { Flex } from '@chakra-ui/react';

import { FormInput } from '../FormInput';

import { useResponseContext } from '../ResponseContext';

interface InputBlockProps {
  label: string;
  fieldRef: string;
}

export const InputBlock = ({ label, fieldRef, ...defaultAttrs }: InputBlockProps) => {
  const responseContext = useResponseContext();

  return (
    <Flex alignItems="center" justifyContent="space-between" gap="2">
      {label && <label className="form-label">{label}</label>}

      <FormInput
        {...defaultAttrs}
        value={responseContext?.response?.[fieldRef] ?? ''}
        onChange={(e) =>
          responseContext?.setResponse({
            ...responseContext?.setResponse,
            [fieldRef]: e.target.value,
          })
        }
      />
    </Flex>
  );
};
