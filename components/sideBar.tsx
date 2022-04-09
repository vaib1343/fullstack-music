import {
  Box,
  List,
  ListIcon,
  ListItem,
  Center,
  LinkBox,
  LinkOverlay,
  Divider,
} from '@chakra-ui/layout';
import { MdHome, MdSearch, MdLibraryMusic, MdPlaylistAdd, MdFavorite } from 'react-icons/md';
import Image from 'next/image';
import Logo from '../public/logo.svg';
import NextLink from 'next/link';
import { usePlaylist } from '../lib/hooks';

const navMenu = [
  { name: 'Home', icon: MdHome, route: '/' },
  { name: 'Search', icon: MdSearch, route: '/search' },
  { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
];

const musicMenu = [
  { name: 'Create Playlist', icon: MdPlaylistAdd, route: '/' },
  { name: 'Favourites', icon: MdFavorite, route: '/' },
];

const PlayList = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const SideBar = () => {
  const { playlist } = usePlaylist();
  return (
    <Box width={'100%'} height='calc(100vh - 100px)' bg={'black'} paddingX='5px' color={'gray'}>
      <Box paddingY={'20px'} height='100%'>
        <Box width={'120px'} marginBottom='20px' paddingX={'20px'}>
          <Image src={Logo} alt='Logo' height={60} width={120} />
        </Box>
        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map((menuItem) => (
              <ListItem paddingX='20px' fontSize='16px' key={menuItem.name}>
                <LinkBox>
                  <NextLink href={menuItem.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={menuItem.icon} color='white' marginRight='20px' />
                      {menuItem.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginY={'20px'}>
          <List spacing={2}>
            {musicMenu.map((item) => (
              <ListItem paddingX={'20px'} fontSize='16px' key={item.name}>
                <LinkBox>
                  <NextLink href={item.route} passHref>
                    <LinkOverlay>
                      <ListIcon as={item.icon} color='white' marginRight={'20px'} />
                      {item.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider bg={'gray.700'} />
        <Box height='66%' overflowY={'auto'} paddingY='20px'>
          <List spacing={2}>
            {playlist.map((item) => (
              <ListItem paddingX={'20px'} key={item.id}>
                <LinkBox>
                  <NextLink
                    href={{ pathname: '/playlist/[id]', query: { id: item.id } }}
                    passHref
                  >
                    <LinkOverlay>{item.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
