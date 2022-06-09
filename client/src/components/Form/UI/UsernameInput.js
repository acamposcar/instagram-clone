
import React, { forwardRef } from 'react'
import { FormControl, Input, FormLabel } from '@chakra-ui/react'

const UsernameInput = forwardRef((props, ref) => {
  return (
    <FormControl variant='floating' isRequired>
      <Input fontSize={14} paddingTop={3} backgroundColor='bgColor' placeholder=' ' name='username' ref={ref} autofocus autoComplete='username' />
      <FormLabel color='grey' fontWeight={400} fontSize={15}>Username</FormLabel>
    </FormControl>
  )
})

export default UsernameInput
