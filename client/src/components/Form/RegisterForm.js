import React, { useRef } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import UsernameInput from './UI/UsernameInput'
import PasswordInput from './UI/PasswordInput'
import ButtonSubmit from './UI/ButtonSubmit'
import NameInput from './UI/NameInput'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const nameRef = useRef('')
  const usernameRef = useRef('')
  const passwordRef = useRef('')
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(usernameRef.current.value)
    navigate('/login', { replace: true })
  }
  return (
    <form onSubmit={submitHandler}>
      <VStack gap={2}>
        <Text as='h2' textAlign='center' color='gray'>
          Sign up to see photos and videos from your friends.
        </Text>
        <NameInput ref={nameRef} />
        <UsernameInput ref={usernameRef} />
        <PasswordInput ref={passwordRef} />
        <ButtonSubmit text='Register' />
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
