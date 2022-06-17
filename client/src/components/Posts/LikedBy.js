import React from 'react'
import { Flex, Avatar, Text, Box } from '@chakra-ui/react'
import RouterLink from '../RouterLink'
const LikedBy = ({ likes }) => {
  if (likes.length === 0) return (<></>)

  const othersLikes = likes.length > 1 ? <> and <Text as='span' fontWeight={500}>{likes.length - 1} others</Text></> : <></>

  return (

    <Flex my={2} gap={2} px={5} alignItems='center'>
      <RouterLink to={`/accounts/${likes[0].likedBy.username}`}>
        <Avatar size='xs' name={likes[0].likedBy.username} src={`${likes[0].likedBy.avatar}`} />
      </RouterLink>
      <Box fontSize='14px'>Liked by
        {' '}
        <RouterLink to={`/accounts/${likes[0].likedBy.username}`}>{likes[0].likedBy.username}</RouterLink>
        {' '}
        {othersLikes}
      </Box>
    </Flex>
  )
}

export default LikedBy
