import React from 'react'
import { Box, Avatar, Text, Button, Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import CountDesktop from './CountDesktop'
import CountMobile from './CountMobile'
import AvatarForm from '../Form/AvatarForm'
import CustomModal from '../CustomModal'
const Header = ({ postsCount, user, updateAvatar }) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <Button size='sm' colorScheme='gray' variant='outline'>Edit profile</Button>
          </Flex>
          {breakpoint === 'desktop' &&
            <>
              <CountDesktop postsCount={postsCount} followersCount={[].length} followingCount={[].length} />
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
          <CountMobile postsCount={postsCount} followersCount={[].length} followingCount={[].length} />
        </>}
    </>
  )
}

export default Header
