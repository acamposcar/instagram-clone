import React from 'react'
import { Box, Flex, Avatar, Text, Menu, MenuButton, MenuItem, MenuList, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import { ReactComponent as MoreOptionsIcon } from '../../assets/icons/moreOptions.svg'
const Header = ({ user, location, avatarSize = 'sm' }) => {
  return (

    <Flex p={3} justifyContent='space-between' alignItems='center'>
      <Flex gap={3} alignItems='center'>
        <Link as={RouterLink} to={`/accounts/${user.username}`}>
          <Avatar size={avatarSize} name={user.username} src={user.avatar} />
        </Link>
        <Box>
          <Link color='inherit' as={RouterLink} to={`/accounts/${user.username}`}>
            <Box fontWeight='500' fontSize='14px'>{user.username}</Box>
          </Link>
          {location && location !== '' && <Text fontSize='13px' color='var(--textSecondary)'>{location}</Text>}
        </Box>
      </Flex>
      <Menu>
        <MenuButton>
          <MoreOptionsIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>Go to post</MenuItem>
          <MenuItem>Share to...</MenuItem>
          <MenuItem>Copy link</MenuItem>
          <MenuItem>Cancel</MenuItem>
        </MenuList>
      </Menu>

    </Flex>

  )
}

export default Header
