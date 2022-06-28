/** @jsxImportSource @emotion/react */

import React from 'react'
import { Button } from '@chakra-ui/react'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'
import { toggleSavePost } from '../../../services/postAPI'
import { useMutation, useQueryClient } from 'react-query'
import { ReactComponent as SaveOutlineIcon } from '../../../assets/icons/saveOutline.svg'
import { ReactComponent as SaveFillIcon } from '../../../assets/icons/saveFill.svg'

const ToggleSave = ({ postId, savedPosts, renderedFromHome }) => {
  const authCtx = useAuth()
  const queryClient = useQueryClient()

  // Check if auth user is in the followers list
  const isSaved = !!savedPosts.find(savedPost => savedPost.user.username === authCtx.user.username)

  const queryParameters = renderedFromHome ? 'homePosts' : ['posts', postId]

  const handleClick = () => {
    mutate({ token: authCtx.token, postId })
  }

  const { mutate } = useMutation(toggleSavePost, {
    // Optimistic update: https://react-query.tanstack.com/guides/optimistic-updates
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(queryParameters)

      const previousQuery = queryClient.getQueryData(queryParameters)

      // Optimistically update to the new value
      if (isSaved) {
        // Delete user from savedPosts list
        if (renderedFromHome) {
          queryClient.setQueryData('homePosts', old => {
            return old.map(post => {
              if (post._id === postId) {
                return { ...post, saved: post.saved.filter(savedPost => savedPost.user.username !== authCtx.user.username) }
              }
              return post
            })
          })
        } else {
          queryClient.setQueryData(['posts', postId], old => {
            return {
              ...old, saved: old.saved.filter(savedPost => savedPost.user.username !== authCtx.user.username)
            }
          })
        }
      } else {
        // Add user to savedPosts list
        if (renderedFromHome) {
          queryClient.setQueryData('homePosts', old => {
            return old.map(post => {
              if (post._id === postId) {
                return { ...post, saved: [...post.saved, { user: authCtx.user }] }
              }
              return post
            })
          })
        } else {
          queryClient.setQueryData(['posts', postId], old => {
            return {
              ...old, saved: [...old.saved, { user: authCtx.user }]
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
    hoverFill: isSaved ? 'red.300' : 'red',
    fill: isSaved ? 'black' : 'black'
  }

  return (

    <Button height='auto' minW={0} p={0} size='sm' as='button' variant='ghost' onClick={handleClick} fill={icon.fill} color='black' _hover={{ fill: '#8e8e8e', color: '#8e8e8e' }} _active={{}}>
      {isSaved ? <SaveFillIcon css={{ fill: 'inherit' }} /> : <SaveOutlineIcon css={{ color: 'inherit' }} />}
    </Button>
  )
}

export default ToggleSave
