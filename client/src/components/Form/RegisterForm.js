import React, { useRef } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import UsernameInput from './UI/UsernameInput'
import PasswordInput from './UI/PasswordInput'
import ButtonSubmit from './UI/ButtonSubmit'
import NameInput from './UI/NameInput'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import loginHandler from '../../utils/loginHandler'
import AlertError from '../AlertError'

const RegisterForm = () => {
  const nameRef = useRef('')
  const usernameRef = useRef('')
  const passwordRef = useRef('')
  const navigate = useNavigate()

  const { loading, sendRequest, error } = useFetch()
  const authCtx = useAuth()

  const from = '/'

  const submitHandler = (e) => {
    e.preventDefault()

    const loginUser = (response) => {
      loginHandler(response, navigate, from, authCtx)
    }

    sendRequest({
      url: '/api/v1/users/register',
      method: 'POST',
      body: JSON.stringify({
        name: nameRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, loginUser)
  }

  return (
    <form onSubmit={submitHandler}>
      <VStack gap={2}>
        {error && <AlertError error={error} />}

        <Text as='h2' textAlign='center' color='gray'>
          Sign up to see photos and videos from your friends.
        </Text>
        <NameInput ref={nameRef} />
        <UsernameInput ref={usernameRef} />
        <PasswordInput ref={passwordRef} />
        <ButtonSubmit loading={loading} text='Register' />
        <Text fontSize={13} as='p' textAlign='center' color='gray'>
          People who use our service may have uploaded your contact information to Instagram
        </Text>
        <Text fontSize={13} as='p' textAlign='center' color='gray'>
          By signing up, you agree to our Terms . Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookies Policy .
        </Text>
      </VStack>

    </form>
  )
}

export default RegisterForm
