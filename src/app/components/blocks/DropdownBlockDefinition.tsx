import { Icon } from '@chakra-ui/react';
import { GoSingleSelect } from 'react-icons/go';
import { BlockDefinition } from './BlockLibrary';
import { DropdownBlock } from './DropdownBlock';
import SelectBlockSettings from './SelectBlockSettings';

export const DropdownBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Dropdown',
  },

  iconType: <Icon as={GoSingleSelect} />,

  block: DropdownBlock,
  blockSettings: () => {
    return <SelectBlockSettings />;
  },

  factory: () => ({
    fieldRef: 'select dropdown',
    label: 'label text',
    placeholder: 'placeholder text',

    options: [
      { label: 'option one', value: 'value one' },
      { label: 'option two', value: 'value two' },
    ],
  }),
};
