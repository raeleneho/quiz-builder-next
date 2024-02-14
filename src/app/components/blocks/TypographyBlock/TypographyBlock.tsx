import { Box } from '@chakra-ui/react';

interface TypographyBlockProps {
  textValue: string;
}

function TypographyBlock({ textValue }: TypographyBlockProps) {
  return <Box dangerouslySetInnerHTML={{ __html: textValue }} color="white"></Box>;
}

export default TypographyBlock;
