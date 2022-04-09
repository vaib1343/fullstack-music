import { Box } from '@chakra-ui/layout';
import { Table, Thead, Td, Tr, Tbody, IconButton, Th } from '@chakra-ui/react';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { formatDate, formatTime } from '../lib/formatter';
import { useStoreActions } from 'easy-peasy';

type artistType = {
  id: number;
  name: string;
};

type SongsType = {
  id: number;
  name: string;
  duration: number;
  artistId: number;
  artist: artistType;
  url: string;
  updatedAt: Date;
  createdAt: Date;
};

type SongsTableProps = {
  songs: SongsType[];
};

export default function SongsTable({ songs }: SongsTableProps) {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  }
  return (
    <Box bg={'transparent'}>
      <Box padding={'10px'} marginBottom='20px'>
        <Box marginBottom={'30px'}>
          <IconButton
            aria-label='play'
            icon={<BsFillPlayFill />}
            fontSize='30px'
            colorScheme={'green'}
            size='lg'
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant={'unstyled'} color='white'>
          <Thead borderBottom={'1px solid'} borderColor='rgba(255,255,255,0.2)'>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song) => (
              <Tr
                sx={{
                  transition: 'all .3s',
                  '&:hover': {
                    bg: 'rgba(255,255,255,0.1)',
                  },
                }}
                key={song.id}
                cursor='pointer'
                onClick={() => handlePlay(song)}
              >
                <Td>{song.id}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
