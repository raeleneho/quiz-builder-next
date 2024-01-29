import { BlockType } from '../../../api/BlockClient';
import { InputBlock } from './InputBlock';
import { TextareaBlock } from './TextareaBlock';
import TypographyBlock from './TypographyBlock';

export interface BlockDefinition {
  inserterOptions: {
    label: string;
  };

  block: React.FC<any>;

  factory: () => Record<string, string>;
}

const InputBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Input',
  },

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

  block: TextareaBlock,

  factory: () => ({
    fieldRef: 'Textarea',
    placeholder: 'placeholder text',
  }),
};

const TypographyBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Typography',
  },

  block: TypographyBlock,

  factory: () => ({ textValue: 'intial text here' }),
};

export const blockLibrary: Record<BlockType, BlockDefinition> = {
  [BlockType.TEXTAREA]: TextareaBlockDefinition,
  [BlockType.INPUT]: InputBlockDefinition,
  [BlockType.TYPOGRAPHY]: TypographyBlockDefinition,
};
