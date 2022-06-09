
import React, { forwardRef } from 'react'
import { FormControl, Input, FormLabel } from '@chakra-ui/react'

const NameInput = forwardRef((props, ref) => {
  return (
    <FormControl variant='floating' isRequired>
      <Input placeholder=' ' name='name' ref={ref} autofocus autoComplete='name' />
      <FormLabel color='grey' fontWeight={400} fontSize={15}>Full Name</FormLabel>
    </FormControl>
  )
})

export default NameInput
