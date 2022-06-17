import React, { useCallback, useState } from 'react'
import { Box, Avatar, Text, Button, Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import CountDesktop from './CountDesktop'
import CountMobile from './CountMobile'
import AvatarForm from '../Form/AvatarForm'
import CustomModal from '../CustomModal'
import useAuth from '../../hooks/useAuth'
import Follow from './Follow'
const Header = ({ postsCount, user, updateAvatar, initialFollowers, following }) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authCtx = useAuth()
  const isOwnProfile = authCtx.user?.username === user.username
  const [followers, setFollowers] = useState(initialFollowers)

  // Check if auth user is in followers list
  const [isFollowing, setIsFollowing] = useState(!!initialFollowers.find(follower => follower.user.username === authCtx.user.username))

  const handleFollow = useCallback(() => {
    // Add auth user to followers list
    setFollowers(prevState => {
      return [...prevState, { user: authCtx.user }]
    })
    setIsFollowing(true)
  }, [authCtx.user])

  const handleUnfollow = useCallback(() => {
    // Remove auth user from followers list
    setFollowers(prevState => {
      return prevState.filter(follower => follower.user.username !== authCtx.user.username)
    })
    setIsFollowing(false)
  }, [authCtx.user])

  return (
    <>
      <Flex gap={{ md: '70px', base: '30px' }} fontSize={16} justifyContent='center' alignItems='center'>
        <Box as='button'>
          <CustomModal isOpen={isOpen} onClose={onClose} title='Change Profile Photo'>
            <AvatarForm closeModal={onClose} updateAvatar={updateAvatar} />
          </CustomModal>
          <Avatar onClick={onOpen} height={{ md: '150px', base: '77px' }} width={{ md: '150px', base: '77px' }} name={user.name} src={user.avatar} />
        </Box>
        <Box>
          <Flex alignItems='center' justifyContent='space-between' gap={3} flexWrap='wrap'>
            <Text as='h1' fontSize={25} fontWeight={300}>{user.username}</Text>

            {isOwnProfile && <Button size='sm' colorScheme='gray' variant='outline'>Edit profile</Button>}
            {!isOwnProfile && isFollowing && <Follow text='Unfollow' onFollow={handleUnfollow} color='pink' username={user.username} />}
            {!isOwnProfile && !isFollowing && <Follow text='Follow' onFollow={handleFollow} color='blue' username={user.username} />}
          </Flex>
          {breakpoint === 'desktop' &&
            <>
              <CountDesktop postsCount={postsCount} followersCount={followers.length} followingCount={following.length} />
              <Text as='div' fontWeight='500'>{user.name}</Text>
              <Text as='div'>{user.bio}</Text>
            </>}
        </Box>
      </Flex>
      {breakpoint !== 'desktop' &&
        <>
          <Flex p={5} alignItems='center' flexDirection='column'>
            <Text as='div' fontWeight='500'>{user.name}</Text>
            <Text as='div'>{user.bio}</Text>
          </Flex>
          <CountMobile postsCount={postsCount} followersCount={followers.length} followingCount={following.length} />
        </>}
    </>
  )
}

export default Header
