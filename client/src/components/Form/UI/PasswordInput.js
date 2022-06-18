
import React, { useState } from 'react'
import { FormControl, Input, FormLabel, FormErrorMessage, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const PasswordInput = ({ register, errors, validators, autoComplete = 'current-password' }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <FormControl variant='floating' isInvalid={errors}>
      <InputGroup size='md'>
        <Input
          id='password'
          fontSize={14}
          paddingTop={3}
          backgroundColor='bgColor'
          type={showPassword ? 'text' : 'password'}
          placeholder=' '
          name='password'
          autoComplete={autoComplete}
          {...register('password', validators)}
        />
        <FormLabel htmlFor='password' color='grey' fontWeight={400} fontSize={15}>Password</FormLabel>
        <InputRightElement width='4.5rem'>
          <Button backgroundColor='transparent' color='gray' colorScheme='gray' h='1.75rem' size='sm' onClick={handleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>
        {errors && errors.message}
      </FormErrorMessage>
    </FormControl>

  )
}

export default PasswordInput
