import { Icon } from '@chakra-ui/react';

import { BlockDefinition } from './BlockLibrary';
import MultiSelectBlock from './MultiSelectBlock';
import SelectBlockSettings from './SelectBlockSettings';

import { GoMultiSelect } from 'react-icons/go';
export const MultiSelectBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Multi-choice',
  },

  iconType: <Icon as={GoMultiSelect} />,

  block: MultiSelectBlock,
  blockSettings: () => {
    return <SelectBlockSettings />;
  },

  factory: () => ({
    fieldRef: 'multi select',
    label: 'label text',
    options: [
      { label: 'test one', value: 'value one' },
      { label: 'option two', value: 'value two' },
    ],
  }),
};
