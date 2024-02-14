import { Icon } from '@chakra-ui/react';
import { GoSingleSelect } from 'react-icons/go';
import { BlockDefinition } from './BlockLibrary';
import { SelectBlock } from './SelectBlock';

export const DropdownBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Dropdown',
  },

  iconType: <Icon as={GoSingleSelect} />,

  block: SelectBlock,
  blockSettings: () => {
    return <div>Input</div>;
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
