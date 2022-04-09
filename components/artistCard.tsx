import { Image } from '@chakra-ui/react';
import { Box, Text } from '@chakra-ui/layout';
export default function Artistcard({ artist }) {
  return (
    <Box bg={'gray.800'} borderRadius='4px' padding={'15px'} width='100%'>
      <Image
        src='https://i.pravatar.cc/'
        borderRadius={'100%'}
      />
      <Box marginTop={'20px'}>
        <Text fontWeight={'bold'}>{artist.name}</Text>
        <Text fontSize={'xs'}>Artist</Text>
      </Box>
    </Box>
  );
}
