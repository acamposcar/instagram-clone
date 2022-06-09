import React, { useRef } from 'react'
import { VStack } from '@chakra-ui/react'
import UsernameInput from './UI/UsernameInput'
import PasswordInput from './UI/PasswordInput'
import ButtonSubmit from './UI/ButtonSubmit'
const LoginForm = () => {
  const usernameRef = useRef('')
  const passwordRef = useRef('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(usernameRef.current.value)
  }
  return (
    <form onSubmit={submitHandler}>
      <VStack gap={2}>
        <UsernameInput ref={usernameRef} />
        <PasswordInput ref={passwordRef} />
        <ButtonSubmit text='Log In' />
      </VStack>
    </form>
  )
}

export default LoginForm
