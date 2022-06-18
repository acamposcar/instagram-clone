
import React from 'react'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import UserList from '../UserList'
import CustomModal from '../CustomModal'

const CountMobile = ({ postsCount, followers, following }) => {
  const { isOpen: isOpenFollowers, onOpen: onOpenFollowers, onClose: onCloseFollowers } = useDisclosure()
  const { isOpen: isOpenFollowing, onOpen: onOpenFollowing, onClose: onCloseFollowing } = useDisclosure()

  return (
    <>
      <CustomModal isOpen={isOpenFollowers} onClose={onCloseFollowers} title='Followers'>
        <UserList list={followers} />
      </CustomModal>
      <CustomModal isOpen={isOpenFollowing} onClose={onCloseFollowing} title='Following'>
        <UserList list={following} user='following' />
      </CustomModal>

      <Flex marginTop={5} padding={2} justifyContent='space-around' gap={3} width='100%' textAlign='center' borderTop='1px solid var(--borderColor)' borderBottom='1px solid var(--borderColor)'>
        <Box>
          <Box as='span' fontWeight='bold'>{postsCount}</Box>
          <Box color='var(--textSecondary)'>posts</Box>
        </Box>
        <Box as='button' onClick={onOpenFollowers}>
          <Box as='span' fontWeight='bold'>{followers.length}</Box>
          <Box color='var(--textSecondary)'>followers</Box>
        </Box>
        <Box as='button' onClick={onOpenFollowing}>
          <Box as='span' fontWeight='bold'>{following.length}</Box>
          <Box color='var(--textSecondary)'>following</Box>
        </Box>
      </Flex>
    </>
  )
}

export default CountMobile
