import React from 'react'
import { Box, Flex, Avatar, Text, Menu, MenuButton, MenuItem, MenuList, Link } from '@chakra-ui/react'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import { ReactComponent as MoreOptionsIcon } from '../../assets/icons/moreOptions.svg'
import { toast } from 'react-toastify'
import { IoMdShareAlt, IoMdShare } from 'react-icons/io'
const Header = ({ user, location, avatarSize = 'sm', postId }) => {
  const url = new URL(window.location.href)
  const postURL = `${url.protocol}//${url.host}/posts/${postId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postURL)
    toast.success('Copied to clipboard!')
  }
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
          <Link color='black' as={NavLink} to={`/posts/${postId}`} _hover={{ color: 'inherit', textDecoration: 'none' }}><MenuItem display='flex' gap={1} alignItems='center'><IoMdShareAlt />Go to post</MenuItem></Link>
          <MenuItem onClick={copyToClipboard} display='flex' gap={1} alignItems='center'><IoMdShare />Copy link</MenuItem>
        </MenuList>
      </Menu>

    </Flex>

  )
}

export default Header
