import React from 'react'
import { Box } from '@chakra-ui/react'

const Card = (props) => {
  return (
    <Box width='100%' border='solid 1px var(--borderColor)' backgroundColor='white' borderRadius='8px' maxWidth='470px'>
      {props.children}
    </Box>
  )
}

export default Card
