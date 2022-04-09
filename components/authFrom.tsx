import { Box, Flex, Input, Button, useTab } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';
import NextImage from 'next/image';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    let requestBody;
    if (mode === 'signup') {
      requestBody = {
        firstName,
        lastName,
        email,
        password,
      };
    } else if (mode === 'signin') {
      requestBody = {
        email,
        password,
      };
    }

    const user = await auth(mode, requestBody);

    setIsLoading(false);
    router.push('/');
  };

  return (
    <Box width={'100vw'} height='100vh' bg={'black'} color='white'>
      <Flex height='100px' justify={'center'} align='center' borderBottom={'2px solid white'}>
        <NextImage src={'/logo.svg'} height='60px' width={'120px'} />
      </Flex>
      <Flex height={'calc(100vh - 100px)'} justify='center' align='center'>
        <Box padding='50px' bg='gray.900' borderRadius='6px'>
          <form onSubmit={(e) => handleSubmit(e)}>
            {mode === 'signup' && (
              <>
                <Input
                  type={'text'}
                  placeholder='Firstname'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  type={'text'}
                  placeholder='Lastname'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                marginTop={'20px'}

                />
              </>
            )}
            <Input
              type={'email'}
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              marginTop={'20px'}

            />
            <Input
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
              marginTop={'20px'}
            />
            <Box display={'flex'} justifyContent='center' alignItems={'center'} marginTop='20px'>
              <Button
                type='submit'
                bg='green.500'
                isLoading={isLoading}
                sx={{
                  '&:hover': {
                    bg: 'green.400',
                  },
                }}
              >
                {mode.toUpperCase()}
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
