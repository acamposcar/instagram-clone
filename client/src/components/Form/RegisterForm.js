import React from 'react'
import { VStack, Box, Button, Text } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import loginHandler from '../../utils/loginHandler'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import PasswordInput from './UI/PasswordInput'
import TextInput from './UI/TextInput'
import { validators } from '../../utils/validators'
import { useMutation } from 'react-query'
import { registerUser } from '../../lib/api'

const RegisterForm = () => {
  const authCtx = useAuth()

  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()

  const location = useLocation()
  const navigate = useNavigate()

  // Save the page they tried to visit when they were redirected
  // to the login page to redirect them after login
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    mutate(data)
  }

  const { mutate, isLoading } = useMutation(registerUser, {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      loginHandler(data, navigate, from, authCtx)
    }
  })

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} width='100%'>
      <VStack gap={2}>
        <Text as='h2' textAlign='center' color='gray'>
          Sign up to see photos and videos from your friends.
        </Text>
        <TextInput fieldName='name' register={register} validators={validators.name} errors={formErrors.name} autoFocus />
        <TextInput fieldName='username' register={register} validators={validators.username} errors={formErrors.username} />
        <PasswordInput autocomplete='new-password' register={register} validators={validators.password} errors={formErrors.password} />
        <Button isLoading={isLoading} type='submit' w='100%'>Sign Up</Button>
      </VStack>
      <Text fontSize={13} as='p' textAlign='center' color='gray' my={3}>
        People who use our service may have uploaded your contact information to Instagram
      </Text>
      <Text fontSize={13} as='p' textAlign='center' color='gray'>
        By signing up, you agree to our Terms . Learn how we collect, use and share your data in our Data Policy and how we use cookies and similar technology in our Cookies Policy .
      </Text>
    </Box>
  )
}

export default RegisterForm
