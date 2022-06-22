import React from 'react'
import { Box, Flex, Avatar, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import MoreOptionsMenu from './Common/MoreOptionsMenu'
const HomePostHeader = ({ user, location, avatarSize = 'sm', postId }) => {
  return (

    <Flex p={3} justifyContent='space-between' alignItems='center'>
      <Flex gap={3} alignItems='center'>
        <Link as={RouterLink} to={`/accounts/${user.username}`}>
          <Avatar size={avatarSize} src={user.avatar} />
        </Link>
        <Box>
          <Link color='inherit' as={RouterLink} to={`/accounts/${user.username}`}>
            <Box fontWeight='500' fontSize='14px'>{user.username}</Box>
          </Link>
          {location && location !== '' && <Text fontSize='13px' color='textSecondary'>{location}</Text>}
        </Box>
      </Flex>
      <MoreOptionsMenu user={user} postId={postId} />
    </Flex>

  )
}

export default HomePostHeader
