import { Icon } from '@chakra-ui/react';
import { GoSingleSelect } from 'react-icons/go';
import { BlockDefinition } from './BlockLibrary';
import { IoCheckboxOutline } from 'react-icons/io5';
import SelectBlockSettings from './SelectBlockSettings';
import CheckboxBlock from './CheckboxBlock';

export const CheckboxBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Checkbox',
  },

  iconType: <Icon as={IoCheckboxOutline} />,

  block: CheckboxBlock,
  blockSettings: () => {
    return <SelectBlockSettings />;
  },

  factory: () => ({
    fieldRef: 'checkbox',
    label: 'label text',
    placeholder: 'placeholder text',

    options: [
      { label: 'option one', value: 'value one' },
      { label: 'option two', value: 'value two' },
    ],
  }),
};
