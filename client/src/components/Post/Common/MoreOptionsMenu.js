import React from 'react'
import { Menu, MenuButton, MenuItem, MenuList, Link } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as MoreOptionsIcon } from '../../../assets/icons/moreOptions.svg'
import { toast } from 'react-toastify'
import { IoMdShareAlt, IoMdShare } from 'react-icons/io'
import DeletePost from './DeletePost'

const MoreOptionsMenu = ({ postId, user }) => {
  const url = new URL(window.location.href)
  const postURL = `${url.protocol}//${url.host}/posts/${postId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postURL)
    toast.success('Copied to clipboard!')
  }

  return (
    <Menu>
      <MenuButton>
        <MoreOptionsIcon />
      </MenuButton>
      <MenuList>
        <Link color='black' as={NavLink} to={`/posts/${postId}`} _hover={{ color: 'inherit', textDecoration: 'none' }}><MenuItem display='flex' gap={1} alignItems='center'><IoMdShareAlt />Go to post</MenuItem></Link>
        <MenuItem onClick={copyToClipboard} display='flex' gap={1} alignItems='center'><IoMdShare />Copy link</MenuItem>
        <DeletePost user={user} postId={postId} />
      </MenuList>
    </Menu>

  )
}

export default MoreOptionsMenu
