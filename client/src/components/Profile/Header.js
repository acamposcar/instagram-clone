import React from 'react'
import { Box, Avatar, Text, Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import CountDesktop from './CountDesktop'
import CountMobile from './CountMobile'
import AvatarForm from '../Form/AvatarForm'
import CustomModal from '../CustomModal'
import useAuth from '../../hooks/useAuth'
import ToggleFollow from './ToggleFollow'
import EditProfile from './EditProfile'
const Header = ({ postsCount, user, followers, following }) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authCtx = useAuth()
  const isOwnProfile = authCtx.user.username === user.username
  const modalTitle = isOwnProfile ? 'Change profile photo' : 'Profile image'
  return (
    <>
      <Flex gap={{ md: '70px', base: '30px' }} fontSize={16} justifyContent='center' alignItems='center'>
        <Box as='button'>
          <CustomModal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            {isOwnProfile && <AvatarForm closeModal={onClose} />}
            {!isOwnProfile &&
              <Flex justifyContent='center' my={5}>
                <Avatar boxSize={{ md: '350px', base: '250px' }} src={user.avatar} />
              </Flex>}
          </CustomModal>
          <Avatar onClick={onOpen} boxSize={{ md: '150px', base: '77px' }} src={user.avatar} />
        </Box>
        <Box>
          <Flex alignItems='center' justifyContent='space-between' gap={3} flexWrap='wrap'>
            <Text as='h1' fontSize={25} fontWeight={300}>{user.username}</Text>
            {isOwnProfile && <EditProfile user={user} />}
            {!isOwnProfile && <ToggleFollow text='Unfollow' followers={followers} color='pink' username={user.username} />}
          </Flex>
          {breakpoint === 'desktop' &&
            <>
              <CountDesktop postsCount={postsCount} followers={followers} following={following} />
              <Text as='div' fontWeight='500'>{user.name}</Text>
              <Text as='div' fontSize={15}>{user.bio}</Text>
            </>}
        </Box>
      </Flex>
      {breakpoint !== 'desktop' &&
        <>
          <Flex p={1} alignItems='center' flexDirection='column'>
            <Text as='div' fontWeight='500'>{user.name}</Text>
            <Text as='div'>{user.bio}</Text>
          </Flex>
          <CountMobile postsCount={postsCount} followers={followers} following={following} />
        </>}
    </>
  )
}

export default Header
