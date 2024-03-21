import { Icon } from '@chakra-ui/react';
import { PiTextT } from 'react-icons/pi';
import { BlockDefinition } from '../BlockLibrary';
import TypographyBlock from './TypographyBlock';
import TypographyBlockSettings from './TypographyBlockSettings';

export const TypographyBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Text',
  },

  iconType: <Icon as={PiTextT} />,

  blockSettings: () => <TypographyBlockSettings />,

  block: TypographyBlock,

  factory: () => ({ textValue: 'intial text here' }),
};
