import React from 'react'
import { Flex, Avatar, Text } from '@chakra-ui/react'

const Liked = ({ likes }) => {
  if (likes.length === 0) return (<></>)

  const othersLikes = likes.length > 1 ? <>and <Text as='span' fontWeight={500}>{likes.length - 1} others</Text></> : <></>

  return (

    <Flex my={2} gap={2} alignItems='center'>
      <Avatar size='xs' name={likes[0].username} src={likes[0].avatar} />
      <Text fontSize='14px'>Liked by <Text as='span' fontWeight={500}>{likes[0].username}</Text>
        {othersLikes}
      </Text>
    </Flex>
  )
}

export default Liked
