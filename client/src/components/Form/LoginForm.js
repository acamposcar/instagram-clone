import React, { useEffect } from 'react'
import { VStack, Box, Button } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import loginHandler from '../../utils/loginHandler'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import PasswordInput from './UI/PasswordInput'
import UsernameInput from './UI/UsernameInput'

const LoginForm = () => {
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
      url: '/api/v1/users/login',
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, loginUser)
  }

  return (
    <Box as='form' onSubmit={handleSubmit(onSubmit)} width='100%'>
      <ToastContainer />
      <VStack gap={2}>
        <UsernameInput register={register} errors={formErrors} focus />
        <PasswordInput register={register} errors={formErrors} />
        <Button isLoading={loading} type='submit' w='100%'>Log In</Button>
      </VStack>
    </Box>
  )
}

export default LoginForm
