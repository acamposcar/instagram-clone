import React from 'react'
import { MenuItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoMdTrash } from 'react-icons/io'
import useAuth from '../../../hooks/useAuth'
import { deletePost } from '../../../lib/api'
import { useMutation, useQueryClient } from 'react-query'
const DeletePost = ({ user, postId }) => {
  const authCtx = useAuth()
  const isAuthor = user.username === authCtx.user.username
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(deletePost, {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('homePosts')
      navigate('/', { replace: false })
    }
  })

  const deletePostHandler = () => {
    mutate({ token: authCtx.token, postId })
  }

  return (
    <>
      {isAuthor &&
        <MenuItem onClick={deletePostHandler} display='flex' gap={1} alignItems='center'>
          <IoMdTrash />Delete post
        </MenuItem>}
    </>
  )
}

export default DeletePost
