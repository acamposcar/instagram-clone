import React from 'react'
import { Flex, Avatar, Box, Text } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
const Message = ({ content, sender, createdAt }) => {
  const formatDate = (date) => formatDistanceToNow(new Date(date), { addSuffix: true })
  const authCtx = useAuth()
  const isOwnMessage = sender._id === authCtx.user._id
  const justify = isOwnMessage ? 'flex-end' : 'flex-start'

  return (
    <Flex width='100%' flexDirection='column' alignItems={justify} gap={1} >
      <Flex textAlign='left' gap={5} alignItems='center' justifyContent={justify}>

        {isOwnMessage &&
          <Box backgroundColor='blue.200' p={3} borderRadius='12px 0px 12px 12px' >
            <Text >{content}</Text>
          </Box>}

        {!isOwnMessage &&
          <>
            <Box>
              <Link to={`/accounts/${sender.username}`}>
                <Avatar size='md' src={sender.avatar} />
              </Link>
            </Box>
            <Box backgroundColor='gray.200' p={3} borderRadius='0px 12px 12px 12px' >
              <Text>{content}</Text>
            </Box>
          </>}

      </Flex >
      <Box color='textSecondary' fontSize={13}>{formatDate(createdAt)}</Box>
    </Flex>

  )
}

export default Message
