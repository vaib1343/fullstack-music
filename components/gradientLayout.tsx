import { Box, Flex, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';

type GradientLayoutProps = {
  color: string;
  children: React.ReactNode;
  image?: string;
  subTitle: string;
  title: string;
  description: string;
  roundImage?: boolean;
};

const GradientLayout = ({
  color,
  children,
  image,
  subTitle,
  title,
  description,
  roundImage,
}: GradientLayoutProps) => {
  return (
    <Box
      height={'100%'}
      overflowY='auto'
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding='40px' align={'end'}>
        <Box padding={'20px'}>
          <Image
            boxSize={'160px'}
            boxShadow='2xl'
            src={image || 'https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0'}
            borderRadius={roundImage ? '100%' : '3px'}
          />
        </Box>
        <Box padding={'20px'} lineHeight='40px' color={'white'}>
          <Text fontSize={'x-small'} fontWeight='bold' casing={'uppercase'}>
            {subTitle}
          </Text>
          <Text fontSize={'6xl'}>{title}</Text>
          <Text fontSize={'sm'}>{description}</Text>
        </Box>
      </Flex>
      <Box paddingY={'20px'}>
        {children}
      </Box>
    </Box>
  );
};

export default GradientLayout;
