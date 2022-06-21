
import React from 'react'
import { FormControl, Input, FormLabel, FormErrorMessage } from '@chakra-ui/react'

const TextInput = ({ register, errors, fieldName, validators, ...restOfProps }) => {
  return (
    <FormControl variant='floating' isInvalid={errors}>
      <Input
        fontSize={14}
        paddingTop={3}
        backgroundColor='bgColor'
        placeholder=' '
        name={fieldName}
        id={fieldName}
        autoComplete={fieldName}
        {...restOfProps}
        {...register(fieldName, validators)}
      />
      <FormLabel textTransform='capitalize' htmlFor={fieldName} color='grey' fontWeight={400} fontSize={15}>{fieldName}</FormLabel>
      <FormErrorMessage>
        {errors && errors.message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default TextInput
