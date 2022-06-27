import React, { useState } from 'react'
import { VStack, Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react'
import CustomAlert from '../components/CustomAlert'
import useAuth from '../hooks/useAuth'
import { getConversations } from '../lib/api'
import { useQuery } from 'react-query'
import CustomSpinner from '../components/CustomSpinner'
import Conversation from '../components/Chat/Conversation'
import Card from '../components/Card'
import Messages from '../components/Chat/Messages'
import ConversationHeader from '../components/Chat/ConversationHeader'
import { ReactComponent as ChatIcon } from '../assets/icons/chat.svg'
import MessageHeader from '../components/Chat/MessageHeader'
const Chat = () => {
  const authCtx = useAuth()
  const [selectedConversationId, setSelectedConversationId] = useState()
  const { isError, data, error } = useQuery('conversations', () => getConversations(authCtx.token))

  const handleSelect = (conversationId) => {
    setSelectedConversationId(conversationId)
  }

  const handleBackward = () => {
    setSelectedConversationId(undefined)
  }

  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const isDesktop = breakpoint === 'desktop'

  const showMessages = selectedConversationId || isDesktop
  const showConversations = !selectedConversationId || isDesktop

  const marginTop = '40px'
  const headerHeight = '55px'
  const newMessageFormHeight = '80px'
  const headerConversationHeight = '70px'
  const offset = isDesktop ? '70px' : '100px'
  const messageHeight = `calc(100vh - ${headerHeight} - ${marginTop} - ${newMessageFormHeight} - ${headerConversationHeight} - ${offset})`
  const conversationHeight = `calc(${messageHeight} + ${newMessageFormHeight})`

  if (data) {
    const conversations = data.conversations
    const following = data.following
    const [selectedConversation] = data.conversations.filter(conversation => conversation._id === selectedConversationId)

    return (
      <Box width='100%' p={0} marginBottom={{ base: '0px', md: '-100px' }}>
        <Flex gap={5} >
          {showConversations &&
            <Card width={{ md: '420px', base: '100%' }} >
              <ConversationHeader contacts={following} onSelectConversation={handleSelect} height={headerConversationHeight} />
              <VStack alignItems='flex-start' minHeight='150px' height={conversationHeight} overflow='auto'>
                {conversations.map(conversation => {
                  return (
                    <Conversation
                      key={conversation._id}
                      onSelectConversation={handleSelect}
                      selectedConversation={selectedConversationId}
                      conversationId={conversation._id}
                      participants={conversation.participants}
                      lastMessage={conversation.lastMessage}
                    />
                  )
                })}
              </VStack>
            </Card>
          }
          {showMessages &&
            <Card>
              {selectedConversationId &&
                <>
                  <MessageHeader conversation={selectedConversation} height={headerConversationHeight} onBackward={handleBackward} />
                  <Messages conversationId={selectedConversationId} height={messageHeight} />
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
