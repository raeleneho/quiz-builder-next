import { Icon } from '@chakra-ui/react';
import { BsTextareaT } from 'react-icons/bs';
import { BlockDefinition } from './BlockLibrary';
import { TextareaBlock } from './TextareaBlock';
import InputBlockSettings from './InputBlockSettings';

export const TextareaBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Textarea',
  },
  iconType: <Icon as={BsTextareaT} />,

  block: TextareaBlock,
  blockSettings: () => <InputBlockSettings />,

  factory: () => ({
    fieldRef: 'Textarea',
    placeholder: 'placeholder text',
  }),
};
