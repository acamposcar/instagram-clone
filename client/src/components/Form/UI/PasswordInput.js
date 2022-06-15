
import React, { useState } from 'react'
import { FormControl, Input, FormLabel, FormErrorMessage, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const PasswordInput = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <FormControl variant='floating' isInvalid={errors.password}>
      <InputGroup size='md'>
        <Input
          id='password'
          fontSize={14}
          paddingTop={3}
          backgroundColor='bgColor'
          type={showPassword ? 'text' : 'password'}
          placeholder=' '
          name='password'
          autoComplete='current-password'
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
            maxLength: { value: 50, message: 'Minimum length should be 50' }
          })}
        />
        <FormLabel htmlFor='password' color='grey' fontWeight={400} fontSize={15}>Password</FormLabel>
        <InputRightElement width='4.5rem'>
          <Button backgroundColor='transparent' color='gray' colorScheme='gray' h='1.75rem' size='sm' onClick={handleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>
        {errors.password && errors.password.message}
      </FormErrorMessage>
    </FormControl>

  )
}

export default PasswordInput
