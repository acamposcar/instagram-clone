import React, { useState, useRef, useEffect } from 'react'
import { Flex, FormControl, Textarea, Button } from '@chakra-ui/react'
import useHttp from '../../hooks/useHttp'
import useAuth from '../../hooks/useAuth'
import { addComment } from '../../lib/api'
import { toast } from 'react-toastify'

const CommentForm = ({ postId, onAddComment }) => {
  const [textareaHeight, setTextareaHeight] = useState('auto')
  const textareaRef = useRef()
  const { sendRequest, loading, data: comment, error, success } = useHttp(addComment, false)

  const authCtx = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = textareaRef.current.value
    if (content === '') return
    sendRequest({ token: authCtx.token, content, postId })
  }

  const resizeTextarea = (e) => {
    setTextareaHeight(textareaRef.current.scrollHeight)
    if (textareaRef.current.value === '') {
      setTextareaHeight('auto')
    }
  }

  useEffect(() => {
    toast.error(error)
  }, [error])

  useEffect(() => {
    if (success) {
      textareaRef.current.value = ''
      onAddComment(comment)
      setTextareaHeight('auto')
    }
  }, [success, onAddComment, comment])

  return (

    <Flex onSubmit={handleSubmit} as='form' p={2} alignItems='center'>
      <FormControl>
        <Textarea overflow='hidden' rows={1} ref={textareaRef} onChange={resizeTextarea} aria-label='Add a comment' fontSize={14} border='none' placeholder='Add a comment...' name='comment' _focusVisible={{ border: 'none' }} resize='none' height={textareaHeight} />
      </FormControl>
      <Button isLoading={loading} fontSize={14} type='submit' variant='ghost' _hover={{ backgroundColor: 'transparent', color: 'blue.300' }}>Post</Button>
    </Flex>
  )
}

export default CommentForm
