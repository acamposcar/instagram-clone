
import React, { useRef } from 'react'
import { Flex, Button, FormControl, Input } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'
import { sendMessage } from '../../lib/api'

const NewMessageForm = ({ conversationId }) => {
  const authCtx = useAuth()
  const inputRef = useRef()
  const queryClient = useQueryClient()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = inputRef.current.value
    if (!content) {
      return
    }
    mutate({ content, token: authCtx.token, conversationId })
  }

  const { mutate, isLoading } = useMutation(sendMessage, {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', conversationId])
      queryClient.invalidateQueries('conversations')
      inputRef.current.value = ''
    }
  })

  return (

    <Flex as='form' onSubmit={handleSubmit} alignItems='center' px={10} height='80px' borderTop='solid thin' borderColor='borderColor'>
      <Flex gap={2} marginBottom={3} width='100%' alignItems='center'>
        <FormControl>
          <Input
            aria-label='Type a message'
            ref={inputRef}
            fontSize={14}
            backgroundColor='bgColor'
            placeholder='Type a message'
            name='message'
            id='message'
          />
        </FormControl>
        <Button variant='outline' isLoading={isLoading} type='submit'>Send</Button>
      </Flex>
    </Flex >

  )
}

export default NewMessageForm
