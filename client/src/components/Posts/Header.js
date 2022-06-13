import React from 'react'
import { Box, Flex, Avatar, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ReactComponent as MoreOptionsIcon } from '../../assets/icons/moreOptions.svg'
const Header = ({ user, location }) => {
  return (

    <Flex p={3} justifyContent='space-between' alignItems='center'>
      <Flex gap={3} alignItems='center'>
        <Avatar size='sm' name={user.username} src={user.avatar} />
        <Box>
          <Text fontWeight='500' fontSize='14px'>{user.username}</Text>
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
