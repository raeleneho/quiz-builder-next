import { Flex, Spacer, Textarea } from '@chakra-ui/react';

import './TextareaBlock.css';
import { useResponseContext } from '../ResponseContext';

interface TextareaBlockProps {
  label: string;
  placeholder: string;
  field: string;
  fieldRef: string;
}

export const TextareaBlock = ({ label, fieldRef, placeholder }: TextareaBlockProps): JSX.Element => {
  const responseContext = useResponseContext();
  return (
    <Flex alignItems="center" justify="space-between" p={2}>
      {label ? <label>{label}</label> : <Spacer />}

      <Textarea
        variant="filled"
        className="textarea-block"
        value={responseContext?.response?.[fieldRef] ?? ''}
        onChange={(e) =>
          responseContext?.setResponse({
            ...responseContext?.setResponse,
            [fieldRef]: e.target.value,
          })
        }
        placeholder={placeholder}
      ></Textarea>
    </Flex>
  );
};
