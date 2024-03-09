import { Box } from '@chakra-ui/react';
import Image from 'next/image';

export interface ImageBlockProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: 'cover' | 'contain';
}

function ImageBlock({ src, alt, width = '100%', height = 'auto', objectFit = 'cover' }: ImageBlockProps) {
  return <>{src ? <img src={src} alt={alt} style={{ objectFit, width, height }} /> : <Box color="white">Upload image file on the right.</Box>}</>;
}

export default ImageBlock;
