
import React, { forwardRef, useState } from 'react'
import { FormControl, Input, FormLabel, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <FormControl variant='floating' isRequired>
      <InputGroup size='md'>
        <Input
          fontSize={14}
          paddingTop={3}
          backgroundColor='bgColor'
          type={showPassword ? 'text' : 'password'}
          placeholder=' '
          name='password'
          ref={ref}
          autoComplete='current-password'
        />
        <FormLabel color='grey' fontWeight={400} fontSize={15}>Password</FormLabel>

        <InputRightElement width='4.5rem'>
          <Button backgroundColor='transparent' color='gray' colorScheme='gray' h='1.75rem' size='sm' onClick={handleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

  )
})

export default PasswordInput
