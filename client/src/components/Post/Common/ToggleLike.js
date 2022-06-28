/** @jsxImportSource @emotion/react */

import React from 'react'
import { Button } from '@chakra-ui/react'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'
import { toggleLikePost } from '../../../services/postAPI'
import { useMutation, useQueryClient } from 'react-query'
import { ReactComponent as HeartFillIcon } from '../../../assets/icons/heartFill.svg'
import { ReactComponent as HeartOutlineIcon } from '../../../assets/icons/heartOutline.svg'

const ToggleLike = ({ postId, likes, renderedFromHome }) => {
  const authCtx = useAuth()
  const queryClient = useQueryClient()

  // Check if auth user is in the followers list
  const isLiked = !!likes.find(like => like.user.username === authCtx.user.username)

  const queryParameters = renderedFromHome ? 'homePosts' : ['posts', postId]
  const handleClick = () => {
    mutate({ token: authCtx.token, postId })
  }

  const { mutate } = useMutation(toggleLikePost, {
    // Optimistic update: https://react-query.tanstack.com/guides/optimistic-updates
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryParameters)

      const previousQuery = queryClient.getQueryData(queryParameters)

      // Optimistically update to the new value
      if (isLiked) {
        // Delete user from likes list
        if (renderedFromHome) {
          queryClient.setQueryData('homePosts', old => {
            return old.map(post => {
              if (post._id === postId) {
                return { ...post, likes: post.likes.filter(like => like.user.username !== authCtx.user.username) }
              }
              return post
            })
          })
        } else {
          queryClient.setQueryData(['posts', postId], old => {
            return {
              ...old, likes: old.likes.filter(like => like.user.username !== authCtx.user.username)
            }
          })
        }
      } else {
        // Add user to likes list
        if (renderedFromHome) {
          queryClient.setQueryData('homePosts', old => {
            return old.map(post => {
              if (post._id === postId) {
                return { ...post, likes: [...post.likes, { user: authCtx.user }] }
              }
              return post
            })
          })
        } else {
          queryClient.setQueryData(['posts', postId], old => {
            return {
              ...old, likes: [...old.likes, { user: authCtx.user }]
            }
          })
        }
      }
      // Return a context object with the snapshotted value
      return { previousQuery }
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error, vars, context) => {
      toast.error(error.message)
      queryClient.setQueryData(queryParameters, context.previousQuery)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(queryParameters)
    }
  })

  const icon = {
    hoverFill: isLiked ? 'red.300' : 'red',
    fill: isLiked ? 'red' : 'black'
  }

  return (

    <Button height='auto' minW={0} p={0} size='sm' as='button' variant='ghost' onClick={handleClick} fill={icon.fill} _hover={{ fill: icon.hoverFill }} _active={{}}>
      {isLiked ? <HeartFillIcon css={{ fill: 'inherit' }} /> : <HeartOutlineIcon css={{ fill: 'inherit' }} />}
    </Button>
  )
}

export default ToggleLike
