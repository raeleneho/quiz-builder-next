import { Icon } from '@chakra-ui/react';
import { PiTextT } from 'react-icons/pi';
import { BlockDefinition } from './BlockLibrary';
import MultiSelectBlock from './MultiSelectBlock';

export const MultiSelectBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Checkbox',
  },

  iconType: <Icon as={PiTextT} />,

  block: MultiSelectBlock,
  blockSettings: () => {
    return <div>Input</div>;
  },

  factory: () => ({ fieldRef: 'Checkbox', label: 'label text' }),
};
