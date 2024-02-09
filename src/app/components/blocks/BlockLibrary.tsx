import { ReactNode } from 'react';
import { BlockType } from '../../../api/BlockClient';
import { InputBlock } from './InputBlock';
import { TextareaBlock } from './TextareaBlock';
import TypographyBlock from './TypographyBlock';
import { Icon } from '@chakra-ui/react';

import { BsTextareaT } from 'react-icons/bs';
import { PiTextT } from 'react-icons/pi';
import { LuFormInput } from 'react-icons/lu';

export interface BlockDefinition {
  inserterOptions: {
    label: string;
  };

  iconType: ReactNode | ReactNode[];

  block: React.FC<any>;

  factory: () => Record<string, string>;
}

const InputBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Input',
  },

  iconType: <Icon as={LuFormInput} />,

  block: InputBlock,

  factory: () => ({
    fieldRef: 'Input',
    label: 'label text',
    placeholder: 'placeholder text',
  }),
};

const TextareaBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Textarea',
  },
  iconType: <Icon as={BsTextareaT} />,

  block: TextareaBlock,

  factory: () => ({
    fieldRef: 'Textarea',
    placeholder: 'placeholder text',
  }),
};

const TypographyBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Text',
  },

  iconType: <Icon as={PiTextT} />,

  block: TypographyBlock,

  factory: () => ({ textValue: 'intial text here' }),
};

export const blockLibrary: Record<BlockType, BlockDefinition> = {
  [BlockType.TEXTAREA]: TextareaBlockDefinition,
  [BlockType.INPUT]: InputBlockDefinition,
  [BlockType.TYPOGRAPHY]: TypographyBlockDefinition,
};
