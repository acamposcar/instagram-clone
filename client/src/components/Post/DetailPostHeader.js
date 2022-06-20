import React from 'react'
import { Box, Flex, Avatar, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import MoreOptionsMenu from './Common/MoreOptionsMenu'

const DetailPostHeader = ({ user, location, avatarSize = 'sm', postId }) => {
  return (

    <Box marginTop={2} justifyContent='center' alignItems='center' borderBottom='solid 1px var(--borderColor)'>
      <Box textAlign='end'>
        <MoreOptionsMenu user={user} postId={postId} />
      </Box>
      <Flex paddingBottom={5} gap={3} alignItems='center' justifyContent='center'>
        <Link as={RouterLink} to={`/accounts/${user.username}`}>
          <Avatar size={avatarSize} name={user.username} src={user.avatar} />
        </Link>
        <Box>
          <Link color='inherit' as={RouterLink} to={`/accounts/${user.username}`}>
            <Box fontWeight='500' fontSize='18px'>{user.username}</Box>
            <Box fontWeight='400' fontSize='15px'>{user.name}</Box>
          </Link>
          {location && location !== '' && <Text fontSize='13px' color='var(--textSecondary)'>{location}</Text>}
        </Box>
      </Flex>

    </Box>

  )
}

export default DetailPostHeader
