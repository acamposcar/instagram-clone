import React, { useState, useEffect } from 'react'
import { VStack, Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import CustomAlert from '../components/CustomAlert'
import useAuth from '../hooks/useAuth'
import { getConversations } from '../services/chatAPI'
import { useQuery, useQueryClient } from 'react-query'
import CustomSpinner from '../components/CustomSpinner'
import Conversation from '../components/Chat/Conversation'
import Card from '../components/Card'
import Messages from '../components/Chat/Messages'
import ConversationHeader from '../components/Chat/ConversationHeader'
import { ReactComponent as ChatIcon } from '../assets/icons/chat.svg'
import MessageHeader from '../components/Chat/MessageHeader'
import { useSocket } from '../contexts/socketContext'

const Chat = () => {
  const queryClient = useQueryClient()
  const socket = useSocket()
  const authCtx = useAuth()
  const [selectedConversationId, setSelectedConversationId] = useState()
  const { isError, data, error } = useQuery('conversations', () => getConversations(authCtx.token))
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const isDesktop = breakpoint === 'desktop'

  const showMessages = selectedConversationId || isDesktop
  const showConversations = !selectedConversationId || isDesktop

  const getConversation = (conversationId) => {
    return data.conversations.find(conversation => conversation._id === conversationId)
  }
  const getRecipient = (conversation) => {
    if (!conversation) return undefined
    return conversation.participants.find(participant => participant._id !== authCtx.user._id)
  }

  useEffect(() => {
    if (socket == null) return

    socket.on('invalidate-query', (conversationId) => {
      queryClient.invalidateQueries(['messages', conversationId])
      queryClient.invalidateQueries('conversations')
    })

    return () => socket.off('invalidate-query')
  }, [socket, queryClient])

  const handleSelectConversation = (conversationId, recipientId) => {
    setSelectedConversationId(conversationId)
    // Join socket room when user selects a conversation
    socket.emit('join-room', recipientId)
  }

  const handleEmitSocket = (conversationId) => {
    const conversation = getConversation(conversationId)
    const recipient = getRecipient(conversation)
    socket.emit('send-message', recipient._id, conversationId)
  }

  const handleBackward = () => {
    setSelectedConversationId(undefined)
  }

  // Adjust chat height to screen
  const marginTop = '40px'
  const headerHeight = '55px'
  const newMessageFormHeight = '80px'
  const headerConversationHeight = '70px'
  const offset = isDesktop ? '70px' : '110px'
  const messageHeight = `calc(100vh - ${headerHeight} - ${marginTop} - ${newMessageFormHeight} - ${headerConversationHeight} - ${offset})`
  const conversationHeight = `calc(${messageHeight} + ${newMessageFormHeight})`

  if (data) {
    const conversations = data.conversations
    const following = data.following
    const selectedConversation = getConversation(selectedConversationId)

    return (
      <Box width='100%' p={0} marginBottom={{ base: '0px', md: '-100px' }}>
        <Flex gap={5} >

          {showConversations &&
            <Card width={{ md: '420px', base: '100%' }} >
              <ConversationHeader contacts={following} onSelectConversation={handleSelectConversation} height={headerConversationHeight} />
              <VStack alignItems='flex-start' minHeight='150px' height={conversationHeight} overflow='auto'>
                {conversations.map(conversation => {
                  return (
                    <Conversation
                      key={conversation._id}
                      onSelectConversation={handleSelectConversation}
                      selectedConversation={selectedConversationId}
                      conversationId={conversation._id}
                      participants={conversation.participants}
                      lastMessage={conversation.lastMessage}
                    />
                  )
                })}
              </VStack>
            </Card>}

          {showMessages &&
            <Card>
              {selectedConversationId &&
                <>
                  <MessageHeader recipient={getRecipient(selectedConversation)} height={headerConversationHeight} onBackward={handleBackward} />
                  <Messages conversationId={selectedConversationId} height={messageHeight} onEmitSocket={handleEmitSocket} />
                </>}
              {!selectedConversationId &&
                <Flex height={conversationHeight} flexDir='column' gap={2} justifyContent='center' alignItems='center'>
                  <ChatIcon />
                  <Text fontSize={23} fontWeight='300'>Your messages</Text>
                  <Text color='textSecondary'>Send private messages to a friend</Text>
                </Flex>}
            </Card>}
        </Flex>
      </Box >
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

export default Chat
