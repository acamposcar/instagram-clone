import React from 'react'
import {
  Box, Flex, Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as HomeFill } from '../assets/icons/homeFill.svg'
import { ReactComponent as HomeOutline } from '../assets/icons/homeOutline.svg'
import { ReactComponent as HeartOutline } from '../assets/icons/heartOutline.svg'
import { ReactComponent as ExploreFill } from '../assets/icons/exploreFill.svg'
import { ReactComponent as ExploreOutline } from '../assets/icons/exploreOutline.svg'
import CreatePost from '../pages/CreatePost'
import { IoMdLogOut, IoMdPerson } from 'react-icons/io'
import useAuth from '../hooks/useAuth'

const Nav = () => {
  const authCtx = useAuth()

  const logoutHandler = () => {
    authCtx.logout()
  }
  return (
    <Flex as='ul' flex={1} listStyleType='none' gap={4} alignItems='center' justifyContent='space-around'>
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
      {authCtx.user &&
        <Box as='li'>
          <Menu>
            <MenuButton>
              <Avatar size='sm' name={authCtx.user.username} src={`${authCtx.user.avatar}`} />
            </MenuButton>
            <MenuList padding={0} boxShadow='0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.2)'>
              <MenuItem as={NavLink} to={`/accounts/${authCtx.user.username}`} display='flex' gap={1} alignItems='center' _hover={{ textDecoration: 'none' }}><IoMdPerson />Profile</MenuItem>
              <MenuItem onClick={logoutHandler} display='flex' gap={1} alignItems='center'><IoMdLogOut />Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>}
    </Flex>

  )
}

export default Nav
