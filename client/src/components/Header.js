import React from 'react'
import {
  Box, Flex, HStack, Link, Image, InputGroup, Input, InputLeftElement, Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { ReactComponent as HomeFill } from '../assets/icons/homeFill.svg'
import { ReactComponent as HomeOutline } from '../assets/icons/homeOutline.svg'
import { ReactComponent as HeartFill } from '../assets/icons/heartFill.svg'
import { ReactComponent as HeartOutline } from '../assets/icons/heartOutline.svg'
import { ReactComponent as ExploreFill } from '../assets/icons/exploreFill.svg'
import { ReactComponent as ExploreOutline } from '../assets/icons/exploreOutline.svg'
import { ReactComponent as Search } from '../assets/icons/search.svg'
import CreatePost from '../pages/CreatePost'
import { IoMdLogOut, IoMdPerson } from 'react-icons/io'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const authCtx = useAuth()

  const logoutHandler = () => {
    authCtx.logout()
  }

  return (
    <Flex as='header' backgroundColor='white' borderBottom='solid thin var(--borderColor)' height='55px' px={8} justifyContent='center'>
      <Flex flex={1} justifyContent='space-between' alignItems='center' maxWidth='900px'>
        <Box>
          <RouterLink to='/'><Image height={7} src={logo} alt='Instagram Logo' _active={{ filter: 'invert(50%)' }} /></RouterLink>
        </Box>
        <Box>
          <InputGroup display={{ md: 'block', base: 'none' }}>
            <InputLeftElement pointerEvents='none' height='34px'>
              <Search color='gray' />
            </InputLeftElement>
            <Input height='34px' fontSize={15} backgroundColor='#EFEFEF' type='text' placeholder='Search' aria-label='Search Input' fontWeight={300} />
          </InputGroup>
        </Box>
        <Box as='nav'>
          <HStack as='ul' listStyleType='none' gap={4}>
            <Box as='li'>
              <NavLink to='/'>
                {({ isActive }) => (
                  isActive ? <HomeFill /> : <HomeOutline />
                )}
              </NavLink>
            </Box>
            <Box as='li'>
              <CreatePost />
            </Box>
            <Box as='li'>
              <NavLink to='/explore'>
                {({ isActive }) => (
                  isActive ? <ExploreFill /> : <ExploreOutline />
                )}
              </NavLink>
            </Box>

            <Menu>
              <MenuButton>
                <HeartOutline />
              </MenuButton>
              <MenuList padding={0} boxShadow='0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)'>
                <MenuItem textAlign='center'>No notifications</MenuItem>
              </MenuList>
            </Menu>

            <Box as='li'>
              <Menu>
                <MenuButton>
                  <Avatar size='sm' name='Dan Abrahmov' src='https://images.unsplash.com/photo-1555834307-b22668f15f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
                </MenuButton>
                <MenuList padding={0} boxShadow='0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)'>
                  <Link color='black' as={NavLink} to='/accounts/acampos' _hover={{ color: 'inherit', textDecoration: 'none' }}><MenuItem display='flex' gap={1} alignItems='center'><IoMdPerson />Profile</MenuItem></Link>
                  <MenuItem onClick={logoutHandler} display='flex' gap={1} alignItems='center'><IoMdLogOut />Log Out</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
