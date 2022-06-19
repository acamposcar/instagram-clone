import React from 'react'
import { Flex, Avatar, Text, Box, useDisclosure } from '@chakra-ui/react'
import RouterLink from '../RouterLink'
import CustomModal from '../CustomModal'
import UserList from '../UserList'
const LikedBy = ({ likes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (likes.length === 0) return (<></>)

  const othersLikes = likes.length > 1 ? <> and <Text as='span' fontWeight={500}>{likes.length - 1} others</Text></> : <></>
  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} title='Likes'>
        <UserList list={likes} />
      </CustomModal>

      <Flex my={2} gap={2} px={5} alignItems='center'>
        <RouterLink to={`/accounts/${likes[0].user.username}`}>
          <Avatar size='xs' name={likes[0].user.username} src={`${likes[0].user.avatar}`} />
        </RouterLink>
        <Box fontSize='14px'>Liked by
          {' '}
          <RouterLink to={`/accounts/${likes[0].user.username}`}>{likes[0].user.username}</RouterLink>
          {' '}
          <Box as='button' onClick={onOpen}>
            {othersLikes}
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default LikedBy
