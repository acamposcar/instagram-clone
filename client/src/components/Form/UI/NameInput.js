
import React from 'react'
import { FormControl, Input, FormLabel, FormErrorMessage } from '@chakra-ui/react'

const NameInput = ({ register, errors }) => {
  return (
    <FormControl variant='floating' isInvalid={errors.name}>
      <Input
        fontSize={14}
        paddingTop={3}
        backgroundColor='bgColor'
        placeholder=' '
        name='name'
        id='name'
        autoFocus
        autoComplete='name'
        {...register('name', {
          required: 'Name is required'
        })}
      />
      <FormLabel htmlFor='name' color='grey' fontWeight={400} fontSize={15}>Name</FormLabel>
      <FormErrorMessage>
        {errors.name && errors.name.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default NameInput
