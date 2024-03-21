import { Icon } from '@chakra-ui/react';
import { LuFormInput } from 'react-icons/lu';
import { BlockDefinition } from './BlockLibrary';
import { InputBlock } from './InputBlock';
import InputBlockSettings from './InputBlockSettings';

export const InputBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Input',
  },

  iconType: <Icon as={LuFormInput} />,

  block: InputBlock,
  blockSettings: () => {
    return <InputBlockSettings />;
  },

  factory: () => ({
    fieldRef: 'Input',
    label: 'label text',
    placeholder: 'placeholder text',
  }),
};
