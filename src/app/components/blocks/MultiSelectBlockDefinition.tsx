import { Icon } from '@chakra-ui/react';
import { IoCheckboxOutline } from 'react-icons/io5';
import { BlockDefinition } from './BlockLibrary';
import MultiSelectBlock from './MultiSelectBlock';
import SelectBlockSettings from './SelectBlockSettings';

export const MultiSelectBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Checkbox',
  },

  iconType: <Icon as={IoCheckboxOutline} />,

  block: MultiSelectBlock,
  blockSettings: () => {
    return <SelectBlockSettings />;
  },

  factory: () => ({
    fieldRef: 'Checkbox',
    label: 'label text',
    options: [
      { label: 'test one', value: 'value one' },
      { label: 'option two', value: 'value two' },
    ],
  }),
};
