import React from 'react'
import { Flex, useBreakpointValue } from '@chakra-ui/react'
import Nav from './Nav'

const MobileNavbar = () => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })

  if (breakpoint === 'desktop') return <></>
  return (

    <Flex as='nav' position='fixed' left={0} bottom={0} width='100%' bgColor='white' p={4} justifyContent='center' borderTop='1px solid var(--borderColor)'>
      <Nav />
    </Flex>

  )
}

export default MobileNavbar
