import React, { useState } from 'react'
import { Box, Avatar, Grid, Text, Button, Flex, useBreakpointValue } from '@chakra-ui/react'
import CountDesktop from './CountDesktop'
import CountMobile from './CountMobile'
const Header = ({ postsCount }) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })

  const [user, setUser] = useState({
    _id: 1,
    username: 'acampos',
    name: 'Alex Campos',
    followers: [{ _id: 2, username: 'courtney' }, { _id: 3, username: 'etroguet' }, { _id: 4, username: 'dakotajones' }],
    following: [{ _id: 2, username: 'courtney' }, { _id: 3, username: 'etroguet' }],
    bio: "Rock'n'roll",
    avatar: 'https://bit.ly/dan-abramov'
  })

  return (
    <>
      <Grid gridTemplateColumns='1fr 2fr' gap={{ md: '70px', base: '10px' }} fontSize={16}>
        <Avatar height={{ md: '150px', base: '77px' }} width={{ md: '150px', base: '77px' }} name={user.name} src={user.avatar} />
        <Box>
          <Flex alignItems='center' justifyContent='space-between' gap={3}>
            <Text as='h1' fontSize={25} fontWeight={300}>{user.username}</Text>
            <Button size='sm' colorScheme='gray' variant='outline'>Edit profile</Button>
          </Flex>
          {breakpoint === 'desktop' && <CountDesktop postsCount={postsCount} followersCount={user.followers.length} followingCount={user.following.length} />}
          <Text as='div' fontWeight='500'>{user.name}</Text>
          <Text as='div'>{user.bio}</Text>
        </Box>
      </Grid>
      {breakpoint !== 'desktop' && <CountMobile postsCount={postsCount} followersCount={user.followers.length} followingCount={user.following.length} />}
    </>
  )
}

export default Header
