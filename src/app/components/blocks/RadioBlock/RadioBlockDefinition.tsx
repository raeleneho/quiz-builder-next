import { Icon } from '@chakra-ui/react';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import { BlockDefinition } from '../BlockLibrary';
import { RadioBlock } from './RadioBlock';
import SelectBlockSettings from '../SelectBlockSettings';

export const RadioBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Radio',
  },

  iconType: <Icon as={MdOutlineRadioButtonChecked} />,

  block: RadioBlock,
  blockSettings: () => {
    return <SelectBlockSettings />;
  },

  factory: () => ({
    fieldRef: 'select radio',
    label: 'label text',
    placeholder: 'placeholder text',
    options: [
      { label: 'test one', value: 'value one' },
      { label: 'option two', value: 'value two' },
    ],
  }),
};
