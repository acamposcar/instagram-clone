import React from 'react'
import { Box, Avatar, Text, Flex, useBreakpointValue, useDisclosure, Button } from '@chakra-ui/react'
import CountDesktop from './CountDesktop'
import CountMobile from './CountMobile'
import AvatarForm from '../Form/AvatarForm'
import CustomModal from '../CustomModal'
import useAuth from '../../hooks/useAuth'
import ToggleFollow from './ToggleFollow'
import EditProfile from './EditProfile'
import { IoMdLogOut } from 'react-icons/io'
const Header = ({ postsCount, user, followers, following }) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authCtx = useAuth()
  const isOwnProfile = authCtx.user.username === user.username
  const modalTitle = isOwnProfile ? 'Change profile photo' : 'Profile image'

  const logoutHandler = () => {
    authCtx.logout()
  }
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
          <Flex alignItems={{ md: 'center', base: 'flex-start' }} justifyContent='space-between' gap={{ md: 5, base: 1 }} flexWrap='wrap' flexDirection={{ base: 'column', md: 'row' }}>
            <Text as='h1' fontSize={25} fontWeight={300}>{user.username}</Text>

            {breakpoint !== 'desktop' &&
              <>
                <Text as='div' fontWeight='500'>{user.name}</Text>
                <Text as='div' fontSize={15}>{user.bio}</Text>
              </>}
            {breakpoint === 'desktop' &&
              <Flex gap={3} alignItems='center'>
                {isOwnProfile && <EditProfile user={user} />}
                {!isOwnProfile && <ToggleFollow followers={followers} username={user.username} />}

              </Flex>}
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
          <Flex width='100%' gap={10} alignItems='center' justifyContent='center' marginTop={5}>
            {isOwnProfile && <EditProfile user={user} />}
            {isOwnProfile && <Button leftIcon={<IoMdLogOut />} size='sm' colorScheme='pink' variant='outline' onClick={logoutHandler}>Log out</Button>}
          </Flex>
          {!isOwnProfile && <ToggleFollow followers={followers} username={user.username} />}
          <CountMobile postsCount={postsCount} followers={followers} following={following} />
        </>}
    </>
  )
}

export default Header
