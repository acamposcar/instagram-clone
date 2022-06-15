import React, { useRef } from 'react'
import { VStack, Box } from '@chakra-ui/react'
import UsernameInput from './UI/UsernameInput'
import PasswordInput from './UI/PasswordInput'
import ButtonSubmit from './UI/ButtonSubmit'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import AlertError from '../AlertError'
import loginHandler from '../../utils/loginHandler'

const LoginForm = () => {
  const usernameRef = useRef('')
  const passwordRef = useRef('')

  const location = useLocation()
  const navigate = useNavigate()

  const { loading, sendRequest, error } = useFetch()
  const authCtx = useAuth()

  // Save the page they tried to visit when they were redirected
  // to the login page to redirect them after login
  const from = location.state?.from?.pathname || '/'

  const submitHandler = (e) => {
    e.preventDefault()

    const loginUser = (response) => {
      loginHandler(response, navigate, from, authCtx)
    }

    sendRequest({
      url: '/api/v1/users/login',
      method: 'POST',
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, loginUser)
  }

  return (
    <Box as='form' onSubmit={submitHandler} width='100%'>
      <VStack gap={2}>
        {error && <AlertError error={error} />}
        <UsernameInput focus ref={usernameRef} />
        <PasswordInput ref={passwordRef} />
        <ButtonSubmit loading={loading} text='Log In' />
      </VStack>
    </Box>
  )
}

export default LoginForm
