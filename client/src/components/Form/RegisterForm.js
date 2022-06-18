import React, { useEffect } from 'react'
import { VStack, Box, Button, Text } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import loginHandler from '../../utils/loginHandler'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import PasswordInput from './UI/PasswordInput'
import TextInput from './UI/TextInput'
import { validators } from '../../utils/validators'

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()

  const location = useLocation()
  const navigate = useNavigate()

  const { loading, sendRequest, error } = useFetch()
  const authCtx = useAuth()

  // Save the page they tried to visit when they were redirected
  // to the login page to redirect them after login
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    toast.error(error)
  }, [error])

  const onSubmit = (data) => {
    const loginUser = (response) => {
      loginHandler(response, navigate, from, authCtx)
    }
    sendRequest({
      url: '/api/v1/auth/register',
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        name: data.name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, loginUser)
  }

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} width='100%'>
      <VStack gap={2}>
        <Text as='h2' textAlign='center' color='gray'>
          Sign up to see photos and videos from your friends.
        </Text>
        <TextInput fieldName='name' register={register} validators={validators.name} errors={formErrors.name} focus />
        <TextInput fieldName='username' register={register} validators={validators.username} errors={formErrors.username} />
        <PasswordInput autocomplete='new-password' register={register} validators={validators.password} errors={formErrors.password} />
        <Button isLoading={loading} type='submit' w='100%'>Log In</Button>
      </VStack>
      <Text fontSize={13} as='p' textAlign='center' color='gray'>
        People who use our service may have uploaded your contact information to Instagram
      </Text>
      <Text fontSize={13} as='p' textAlign='center' color='gray'>
        By signing up, you agree to our Terms . Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookies Policy .
      </Text>
    </Box>
  )
}

export default RegisterForm
