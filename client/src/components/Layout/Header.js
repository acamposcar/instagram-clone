import React from 'react'
import {
  Box, Flex, Image, InputGroup, Input, InputLeftElement
  , Skeleton
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { ReactComponent as Search } from '../../assets/icons/search.svg'
import Nav from './Nav'

const Header = () => {
  return (
    <Flex as='header' backgroundColor='white' borderBottom='solid thin var(--borderColor)' height='55px' px={8} justifyContent='center'>
      <Flex flex={1} justifyContent={{ md: 'space-between', base: 'center' }} alignItems='center' maxWidth='900px'>
        <Box>
          <RouterLink to='/'><Image fallback={<Skeleton width='100%' height='400px' />} height={7} src={logo} alt='Instagram Logo' _active={{ filter: 'invert(50%)' }} /></RouterLink>
        </Box>
        <Box display={{ md: 'block', base: 'none' }}>
          <InputGroup>
            <InputLeftElement pointerEvents='none' height='34px'>
              <Search color='gray' />
            </InputLeftElement>
            <Input height='34px' fontSize={15} backgroundColor='#EFEFEF' type='text' placeholder='Search' aria-label='Search Input' fontWeight={300} />
          </InputGroup>
        </Box>
        <Box as='nav' display={{ md: 'block', base: 'none' }}>
          <Nav />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
