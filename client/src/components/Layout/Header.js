import React from 'react'
import { Box, Flex, Image, Skeleton, useBreakpointValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Nav from './Nav'
import SearchBar from './SearchBar'
const Header = () => {
  const breakpoint = useBreakpointValue({ md: 'desktop' })
  const isDesktop = breakpoint === 'desktop'

  return (
    <Flex as='header' backgroundColor='white' borderBottom='solid thin var(--borderColor)' height='55px' px={8} justifyContent='center'>
      <Flex flex={1} justifyContent={{ md: 'space-between', base: 'center' }} alignItems='center' maxWidth='900px'>
        <Box>
          <RouterLink to='/'><Image fallback={<Skeleton width='100%' height='400px' />} height={7} src={logo} alt='Instagram Logo' _active={{ filter: 'invert(50%)' }} /></RouterLink>
        </Box>
        {isDesktop &&
          <>
            <SearchBar />
            <Box as='nav'>
              <Nav />
            </Box>
          </>}
      </Flex>
    </Flex>
  )
}

export default Header
