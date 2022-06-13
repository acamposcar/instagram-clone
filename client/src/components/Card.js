import React from 'react'
import { Box } from '@chakra-ui/react'

const Card = (props) => {
  return (
    <Box width='100%' border='none' boxShadow='0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' backgroundColor='white' borderRadius='8px' maxWidth='550px'>
      {/* <Box width='100%' border='solid 1px var(--borderColor)' backgroundColor='white' borderRadius='8px' maxWidth='550px'> */}
      {props.children}
    </Box>
  )
}

export default Card
