import React, { useCallback, useState } from 'react'
import { Box, Avatar, Text, Button, Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import CountDesktop from './CountDesktop'
import CountMobile from './CountMobile'
import AvatarForm from '../Form/AvatarForm'
import CustomModal from '../CustomModal'
import useAuth from '../../hooks/useAuth'
import Follow from './Follow'
import EditProfile from './EditProfile'
const Header = ({ postsCount, user, initialFollowers, following }) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authCtx = useAuth()
  const isOwnProfile = authCtx.user?.username === user.username
  const [followers, setFollowers] = useState(initialFollowers)
  const [userState, setUserState] = useState(user)
  // Check if auth user is in followers list
  const [isFollowing, setIsFollowing] = useState(!!initialFollowers.find(follower => follower.user.username === authCtx.user.username))

  const { updateUser } = authCtx

  const handleProfileUpdate = useCallback((updatedUser) => {
    updateUser(updatedUser)
    setUserState(prevState => {
      return { ...prevState, ...updatedUser }
    })
  }, [updateUser])

  const handleAvatarUpdate = useCallback((filename) => {
    updateUser({ avatar: `/uploads/avatar/${filename}` })
    setUserState(prevState => {
      return { ...prevState, avatar: `/uploads/avatar/${filename}` }
    })
  }, [updateUser])

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
          <CustomModal isOpen={isOpen} onClose={onClose} title='Change profile photo'>
            <AvatarForm closeModal={onClose} updateAvatar={handleAvatarUpdate} />
          </CustomModal>
          <Avatar onClick={onOpen} height={{ md: '150px', base: '77px' }} width={{ md: '150px', base: '77px' }} name={userState.name} src={userState.avatar} />
        </Box>
        <Box>
          <Flex alignItems='center' justifyContent='space-between' gap={3} flexWrap='wrap'>
            <Text as='h1' fontSize={25} fontWeight={300}>{userState.username}</Text>

            {isOwnProfile && <EditProfile onProfileUpdate={handleProfileUpdate} user={userState} />}
            {!isOwnProfile && isFollowing && <Follow text='Unfollow' onFollow={handleUnfollow} color='pink' username={userState.username} />}
            {!isOwnProfile && !isFollowing && <Follow text='Follow' onFollow={handleFollow} color='blue' username={userState.username} />}
          </Flex>
          {breakpoint === 'desktop' &&
            <>
              <CountDesktop postsCount={postsCount} followers={followers} following={following} />
              <Text as='div' fontWeight='500'>{userState.name}</Text>
              <Text as='div' fontSize={15}>{userState.bio}</Text>
            </>}
        </Box>
      </Flex>
      {breakpoint !== 'desktop' &&
        <>
          <Flex p={1} alignItems='center' flexDirection='column'>
            <Text as='div' fontWeight='500'>{userState.name}</Text>
            <Text as='div'>{userState.bio}</Text>
          </Flex>
          <CountMobile postsCount={postsCount} followers={followers} following={following} />
        </>}
    </>
  )
}

export default Header
