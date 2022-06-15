
import React from 'react'
import { Button } from '@chakra-ui/react'

const ButtonSubmit = ({ text, loading }) => {
  return (
    <Button isLoading={loading} type='submit' w='100%'>{text}</Button>

  )
}

export default ButtonSubmit
