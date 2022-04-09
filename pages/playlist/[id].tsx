import { Box } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import GradientLayout from '../../components/gradientLayout';
import SongsTable from '../../components/songsTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';

const getBGcolor = (id) => {
  const colors = ['red', 'green', 'orange', 'purple', 'gray', 'teal', 'yellow', 'blue'];
  return colors[id] || colors[Math.floor(Math.random() * colors.length)];
};

export default function Playlist({ playlist }) {
  console.log(playlist);
  const router = useRouter();
  return (
    <GradientLayout
      color={getBGcolor(playlist.id)}
      subTitle='playlist'
      title={playlist.name}
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
}

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  } catch (error) {
    return{
      redirect:{
        permanent: false,
        destination: '/signin'
      }
    }
  }
  const { id } = user;
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};
