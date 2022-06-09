import React from 'react'
import { Box, VStack, Image } from '@chakra-ui/react'
import logo from '../assets/logo.png'

const LogoCard = (props) => {
  return (
    <Box p={7} display='flex' justifyContent='center' backgroundColor='white' border='solid thin #DBDBDB' width='100%'>
      <VStack>
        <Image my={7} src={logo} alt='Instagram Logo' />
        {props.children}
      </VStack>
    </Box>
  )
}

export default LogoCard
