import React, { useEffect } from 'react'
import { Box, Flex, Avatar, Text, Menu, MenuButton, MenuItem, MenuList, Link, Button } from '@chakra-ui/react'
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom'
import { ReactComponent as MoreOptionsIcon } from '../../assets/icons/moreOptions.svg'
import { toast } from 'react-toastify'
import { IoMdShareAlt, IoMdShare, IoMdTrash } from 'react-icons/io'
import useHttp from '../../hooks/useHttp'
import useAuth from '../../hooks/useAuth'
import { deletePost } from '../../lib/api'

const HeaderDetail = ({ user, location, avatarSize = 'sm', postId }) => {
  const { sendRequest, loading, success, data, error } = useHttp(deletePost, false)
  const authCtx = useAuth()
  const isAuthor = user.username === authCtx.user.username
  const url = new URL(window.location.href)
  const postURL = `${url.protocol}//${url.host}/posts/${postId}`
  const navigate = useNavigate()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postURL)
    toast.success('Copied to clipboard!')
  }

  useEffect(() => {
    toast.error(error)
  }, [error])

  useEffect(() => {
    if (success) {
      navigate(`/accounts/${user.username}`, { replace: false })
    }
  }, [success, navigate, user.username])

  const deletePostHandler = () => {
    sendRequest({ token: authCtx.token, postId })
  }
  return (

    <Box marginTop={2} justifyContent='center' alignItems='center' borderBottom='solid 1px var(--borderColor)'>
      <Box textAlign='end'>
        <Menu>
          <MenuButton>
            <MoreOptionsIcon />
          </MenuButton>
          <MenuList>
            <Link color='black' as={NavLink} to={`/posts/${postId}`} _hover={{ color: 'inherit', textDecoration: 'none' }}><MenuItem display='flex' gap={1} alignItems='center'><IoMdShareAlt />Go to post</MenuItem></Link>
            <MenuItem onClick={copyToClipboard} display='flex' gap={1} alignItems='center'><IoMdShare />Copy link</MenuItem>
            {isAuthor &&
              <MenuItem onClick={deletePostHandler} display='flex' gap={1} alignItems='center'>
                <IoMdTrash />Delete post
              </MenuItem>}
          </MenuList>
        </Menu>
      </Box>
      <Flex paddingBottom={5} gap={3} alignItems='center' justifyContent='center'>
        <Link as={RouterLink} to={`/accounts/${user.username}`}>
          <Avatar size={avatarSize} name={user.username} src={user.avatar} />
        </Link>
        <Box>
          <Link color='inherit' as={RouterLink} to={`/accounts/${user.username}`}>
            <Box fontWeight='500' fontSize='18px'>{user.name}</Box>
            <Box fontWeight='400' fontSize='15px'>{user.username}</Box>
          </Link>
          {location && location !== '' && <Text fontSize='13px' color='var(--textSecondary)'>{location}</Text>}
        </Box>
      </Flex>

    </Box>

  )
}

export default HeaderDetail
