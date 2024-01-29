import { Box } from '@chakra-ui/react';
import CustomEditor from '../CustomEditor';

interface TypographyBlockProps {
  textValue: string;
}

function TypographyBlock({ textValue }: TypographyBlockProps) {
  return <Box dangerouslySetInnerHTML={{ __html: textValue }} color="white"></Box>;
}

export default TypographyBlock;
