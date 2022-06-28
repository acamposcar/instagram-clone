
import React from 'react'
import { Flex, Box, Avatar, Button, useBreakpointValue } from '@chakra-ui/react'
import RouterLink from '../RouterLink'
import { IoMdArrowBack } from 'react-icons/io'
const MessageHeader = ({ recipient, height, onBackward }) => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const isDesktop = breakpoint === 'desktop'

  return (
    <Flex justifyContent='space-between' alignItems='center' px={5} height={height} borderBottom='solid thin' borderColor='borderColor'>
      {!isDesktop &&
        <Button variant='unstyled' onClick={onBackward}><IoMdArrowBack size={25} /></Button>}
      {recipient &&
        <Flex flex={1} justifyContent='center'>
          <RouterLink to={`/accounts/${recipient.username}`}>
            <Flex gap={3} >
              <Avatar size='md' src={`${recipient.avatar}`} />
              <Flex flexDir='column'>
                <Box fontWeight='500' fontSize='16px'>{recipient.username}</Box>
                <Box fontWeight='400' fontSize='15px'>{recipient.name}</Box>
              </Flex>
            </Flex>
          </RouterLink>
        </Flex>}
    </Flex>

  )
}

export default MessageHeader
