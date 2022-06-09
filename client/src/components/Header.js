import React from 'react'
import {
  Box, Flex, HStack, Link, Image, InputGroup, Input, InputLeftElement, Avatar, AvatarBadge, AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { ReactComponent as HomeFill } from '../assets/icons/homeFill.svg'
import { ReactComponent as HomeOutline } from '../assets/icons/homeOutline.svg'
import { ReactComponent as HeartFill } from '../assets/icons/heartFill.svg'
import { ReactComponent as HeartOutline } from '../assets/icons/heartOutline.svg'
import { ReactComponent as ExploreFill } from '../assets/icons/exploreFill.svg'
import { ReactComponent as ExploreOutline } from '../assets/icons/exploreOutline.svg'
import { ReactComponent as PlusFill } from '../assets/icons/plusFill.svg'
import { ReactComponent as PlusOutline } from '../assets/icons/plusOutline.svg'
import { ReactComponent as Search } from '../assets/icons/search.svg'
const Header = () => {
  return (
    <Flex as='header' justifyContent='space-between' backgroundColor='white' borderBottom='solid thin var(--borderColor)' py={3} px={8} alignItems='center'>
      <Box>
        <Image height={9} src={logo} alt='Instagram Logo' />
      </Box>
      <Box>
        <InputGroup display={{ md: 'block', sm: 'none', base: 'none' }}>
          <InputLeftElement pointerEvents='none'>
            <Search color='gray' />
          </InputLeftElement>
          <Input backgroundColor='#EFEFEF' type='text' placeholder='Search' aria-label='Search Input' fontWeight={300} />
        </InputGroup>
      </Box>
      <Box as='nav'>
        <HStack as='ul' listStyleType='none' gap={4}>
          <Box as='li'>
            <Link as={NavLink} to='/'><HomeFill /></Link>
          </Box>
          <Box as='li'>
            <Link as={NavLink} to='/new'><PlusOutline /></Link>
          </Box>
          <Box as='li'>
            <Link as={NavLink} to='/explore'><ExploreOutline /></Link>
          </Box>
          <Box as='li'>
            <Link as={NavLink} to='/'><HeartOutline /></Link>
          </Box>
          <Box as='li'>
            <Menu>
              <MenuButton>
                <Avatar size='sm' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Saved</MenuItem>
                <MenuItem>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Box>
    </Flex>
  )
}

export default Header
