import React, { useState, useRef } from 'react'
import { Flex, FormControl, Textarea, Button } from '@chakra-ui/react'
import useAuth from '../../../hooks/useAuth'
import { addComment } from '../../../services/commentAPI'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from 'react-query'

const CommentForm = ({ postId, renderedFromHome }) => {
  const [textareaHeight, setTextareaHeight] = useState('auto')
  const textareaRef = useRef()
  const queryClient = useQueryClient()

  const authCtx = useAuth()
  const queryParameters = renderedFromHome ? 'homePosts' : ['posts', postId]

  const { mutate, isLoading } = useMutation(addComment, {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (comment) => {
      queryClient.invalidateQueries(queryParameters)
      textareaRef.current.value = ''
      setTextareaHeight('auto')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = textareaRef.current.value
    if (content === '') return
    mutate({ token: authCtx.token, content, postId })
  }

  const resizeTextarea = (e) => {
    setTextareaHeight(textareaRef.current.scrollHeight)
    if (textareaRef.current.value === '') {
      setTextareaHeight('auto')
    }
  }

  return (

    <Flex onSubmit={handleSubmit} as='form' p={2} alignItems='center'>
      <FormControl>
        <Textarea overflow='hidden' rows={1} ref={textareaRef} onChange={resizeTextarea} aria-label='Add a comment' fontSize={14} border='none' placeholder='Add a comment...' name='comment' _focusVisible={{ border: 'none' }} resize='none' height={textareaHeight} />
      </FormControl>
      <Button isLoading={isLoading} fontSize={14} type='submit' variant='ghost' _hover={{ backgroundColor: 'transparent', color: 'blue.300' }}>Post</Button>
    </Flex>
  )
}

export default CommentForm
