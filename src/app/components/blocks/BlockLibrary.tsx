import { ReactNode } from 'react';
import { BlockType } from '../../../api/BlockClient';

import { InputBlockDefinition } from './InputBlockDefinition';
import { DropdownBlockDefinition } from './DropdownBlockDefinition';
import { MultiSelectBlockDefinition } from './MultiSelectBlockDefinition';
import { RadioBlockDefinition } from './RadioBlock/RadioBlockDefinition';
import { TextareaBlockDefinition } from './TextareaBlockDefinition';
import { TypographyBlockDefinition } from './TypographyBlock/TypographyBlockDefinition';

export interface BlockDefinition {
  inserterOptions: {
    label: string;
  };

  iconType: ReactNode | ReactNode[];

  block: React.FC<any>;
  blockSettings: React.FC<any>;

  factory: () => Record<string, string | { label: string; value: string }[]>;
}

export interface OptionDefinition {
  label: string;
  value: string;
}
export const blockLibrary: Record<BlockType, BlockDefinition> = {
  [BlockType.TEXTAREA]: TextareaBlockDefinition,
  [BlockType.INPUT]: InputBlockDefinition,
  [BlockType.TYPOGRAPHY]: TypographyBlockDefinition,
  [BlockType.RADIO]: RadioBlockDefinition,
  [BlockType.DROPDOWN]: DropdownBlockDefinition,
  [BlockType.MULTISELECT]: MultiSelectBlockDefinition,
};
