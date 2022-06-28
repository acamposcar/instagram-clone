
import React from 'react'
import { Flex, Box, Avatar } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'

const Conversation = ({ participants, onSelectConversation, conversationId, selectedConversation, lastMessage }) => {
  const authCtx = useAuth()

  const recipient = participants.find(participant => participant._id !== authCtx.user._id)
  return (
    <Flex
      as='button'
      onClick={() => onSelectConversation(conversationId, recipient._id)}
      backgroundColor={selectedConversation === conversationId ? 'gray.200' : 'transparent'}
      width='100%'
      textAlign='left'
      px={4}
      py={3}
      gap={3}
      alignItems='center'
      justifyContent='flex-start'
      _hover={{ backgroundColor: selectedConversation === conversationId ? 'gray.200' : 'gray.100' }}
    >
      <Avatar size='lg' src={recipient.avatar} />
      <Flex flexDir='column'>
        <Box fontWeight='500' fontSize='16px'>{recipient.username}</Box>
        <Box fontWeight='400' fontSize='15px'>{recipient.name}</Box>
        {lastMessage &&
          <Box fontWeight='400' fontSize='14px' color='textSecondary'>{lastMessage.slice(0, 15)} ...</Box>}
      </Flex>
    </Flex>
  )
}

export default Conversation
