
import React from 'react'
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import UserList from '../UserList'
import CustomModal from '../CustomModal'

const CountDesktop = ({ postsCount, followers, following }) => {
  const { isOpen: isOpenFollowers, onOpen: onOpenFollowers, onClose: onCloseFollowers } = useDisclosure()
  const { isOpen: isOpenFollowing, onOpen: onOpenFollowing, onClose: onCloseFollowing } = useDisclosure()
  console.log(following)
  return (
    <>
      <CustomModal isOpen={isOpenFollowers} onClose={onCloseFollowers} title='Followers'>
        <UserList list={followers} />
      </CustomModal>
      <CustomModal isOpen={isOpenFollowing} onClose={onCloseFollowing} title='Following'>
        <UserList list={following} user='following' />
      </CustomModal>
      <Flex my={5} justifyContent='space-between' gap={7}>
        <Text><Box as='span' fontWeight='bold'>{postsCount}</Box> posts</Text>
        <Box as='button' onClick={onOpenFollowers} display='flex' gap={1} alignItems='center'>
          <Box fontWeight='bold'>{followers.length}</Box>
          <Box>
            followers
          </Box>
        </Box>
        <Box as='button' onClick={onOpenFollowing} display='flex' gap={1} alignItems='center'>
          <Box fontWeight='bold'>{following.length}</Box>
          <Box>
            following
          </Box>
        </Box>
      </Flex>
    </>

  )
}

export default CountDesktop
