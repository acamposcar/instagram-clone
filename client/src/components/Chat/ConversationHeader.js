
import React from 'react'
import { Flex, Box, useDisclosure, Button } from '@chakra-ui/react'
import { ReactComponent as NewMessageIcon } from '../../assets/icons/newMessage.svg'
import CustomModal from '../CustomModal'
import NewConversationList from './NewConversationList'

const ConversationHeader = ({ contacts, onSelectConversation, height }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>

      <CustomModal isOpen={isOpen} onClose={onClose} title='New conversation'>
        <NewConversationList list={contacts} user='following' onClose={onClose} onSelectConversation={onSelectConversation} />
      </CustomModal>

      <Flex px={5} height={height} justifyContent='space-between' alignItems='center' borderBottom='solid thin' borderColor='borderColor'>
        <Box fontSize={20}>Conversations</Box>
        <Button variant='unstyled'>
          <NewMessageIcon onClick={onOpen} />
        </Button>
      </Flex>
    </>
  )
}

export default ConversationHeader
