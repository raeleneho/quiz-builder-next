import { PiImage } from 'react-icons/pi';
import ImageBlock from './ImageBlock';
import ImageBlockSettings from './ImageBlockSettings';
import { Icon } from '@chakra-ui/react';

export const ImageBlockDefinition = {
  inserterOptions: {
    label: 'Image',
  },

  iconType: <Icon as={PiImage} />,

  blockSettings: () => <ImageBlockSettings />,

  block: ImageBlock,

  factory: () => ({ src: '', alt: '', width: '100%', height: 'auto', objectFit: 'cover' }),
};
