import React, { useRef } from 'react'
import { VStack, Box } from '@chakra-ui/react'
import UsernameInput from './UI/UsernameInput'
import PasswordInput from './UI/PasswordInput'
import ButtonSubmit from './UI/ButtonSubmit'
import { useLocation, useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const usernameRef = useRef('')
  const passwordRef = useRef('')
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const submitHandler = (e) => {
    e.preventDefault()

    // Send them back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.
    navigate(from, { replace: true })
  }
  return (
    <Box as='form' onSubmit={submitHandler} width='100%'>
      <VStack gap={2}>
        <UsernameInput ref={usernameRef} />
        <PasswordInput ref={passwordRef} />
        <ButtonSubmit text='Log In' />
      </VStack>
    </Box>
  )
}

export default LoginForm
