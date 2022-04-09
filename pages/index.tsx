import { Box, Flex, Text } from '@chakra-ui/layout';
import Head from 'next/head';
import GradientLayout from '../components/gradientLayout';
import prisma from '../lib/prisma';
import { Image } from '@chakra-ui/react';
import Artistcard from '../components/artistCard';
import { useMe } from '../lib/hooks';

export default function Home({ artist }) {
  const {user, isLoading} = useMe();
  if(isLoading){
    return null
  }
  return (
    <GradientLayout
      color={'gray'}
      title={`${user.firstName} ${user.lastName}`}
      subTitle='Profile'
      description={`${user.playlistCount} public playlist`}
      roundImage
    >
      <Box color={'white'} paddingX='40px'>
        <Box marginBottom={'20px'}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Top track this month
          </Text>
          <Text fontSize={'x-small'}>Only visible to you</Text>
        </Box>
        <Flex>
          {artist.map((artist, index) => (
            <Box paddingX='10px' width={'20%'} key={index}>
              <Artistcard artist={artist} />
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
}

export async function getServerSideProps(context) {
  const artist = await prisma.artist.findMany({});
  console.log(artist);
  return {
    props: {
      artist,
    },
  };
}
