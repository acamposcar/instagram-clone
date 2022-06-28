import React from 'react'
import { VStack, Flex, Text } from '@chakra-ui/react'
import CustomAlert from '../CustomAlert'
import useAuth from '../../hooks/useAuth'
import { getMessages } from '../../services/chatAPI'
import { useQuery } from 'react-query'
import CustomSpinner from '../CustomSpinner'
import Message from './Message'
import NewMessageForm from './NewMessageForm'
const Messages = ({ conversationId, height, onEmitSocket }) => {
  const authCtx = useAuth()

  const { isError, data: messages, error } = useQuery(['messages', conversationId], () => getMessages({ token: authCtx.token, conversationId }))

  if (messages) {
    return (
      <Flex flexDirection='column' height='100%'>
        <VStack gap={3} alignItems='flex-start' flexDirection='column-reverse' p={8} height={height} overflow='auto'>
          {messages.length === 0 &&
            <Flex justifyContent='center' alignItems='center' height='100%' width='100%'>
              <Text fontSize={24} fontWeight={300}>No messages found</Text>
            </Flex>
          }
          {messages.length > 0 && messages.map(message => {
            return (
              <Message
                key={message._id}
                content={message.content}
                sender={message.sender}
                createdAt={message.createdAt}
              />)
          })}
        </VStack>
        <NewMessageForm conversationId={conversationId} onEmitSocket={onEmitSocket} />
      </Flex>

    )
  }

  if (isError) {
    return <CustomAlert status='error' title='Fetch error!' message={error.message} />
  }

  return (
    // Loading
    <CustomSpinner />

  )
}

export default Messages
