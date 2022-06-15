
import React from 'react'
import { FormControl, Input, FormLabel, FormErrorMessage } from '@chakra-ui/react'

const UsernameInput = ({ register, errors, focus = false }) => {
  return (
    <FormControl variant='floating' isInvalid={errors.username}>
      <Input
        fontSize={14}
        paddingTop={3}
        backgroundColor='bgColor'
        placeholder=' '
        name='username'
        id='username'
        autoFocus={focus}
        autoComplete='username'
        {...register('username', {
          required: 'Username is required',
          minLength: { value: 3, message: 'Minimum length should be 3' },
          maxLength: { value: 20, message: 'Minimum length should be 20' }
        })}
      />
      <FormLabel htmlFor='username' color='grey' fontWeight={400} fontSize={15}>Username</FormLabel>
      <FormErrorMessage>
        {errors.username && errors.username.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default UsernameInput
