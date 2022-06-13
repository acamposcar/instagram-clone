import React, { useState, useRef } from 'react'

import { Flex, FormControl, Textarea, Button } from '@chakra-ui/react'

const CommentForm = () => {
  const [textareaHeight, setTextareaHeight] = useState('auto')
  const textareaRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
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
      <Button fontSize={14} type='submit' variant='ghost' _hover={{ backgroundColor: 'transparent', color: 'blue.300' }}>Post</Button>
    </Flex>
  )
}

export default CommentForm
