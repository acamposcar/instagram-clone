
import React from 'react'
import { Button } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { toggleFollow } from '../../lib/api'
import { useMutation, useQueryClient } from 'react-query'

const ToggleFollow = ({ username, followers }) => {
  const authCtx = useAuth()
  const queryClient = useQueryClient()

  // Check if auth user is in the followers list
  const isFollowing = !!followers.find(follower => follower.user.username === authCtx.user.username)

  const handleClick = () => {
    mutate({ token: authCtx.token, username })
  }

  const { mutate } = useMutation(toggleFollow, {
    // Optimistic update: https://react-query.tanstack.com/guides/optimistic-updates
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['profile', username])

      const previousProfile = queryClient.getQueryData(['profile', username])

      // Optimistically update to the new value
      if (isFollowing) {
        // Delete user from followers list
        queryClient.setQueryData(['profile', username], old => {
          return {
            ...old, followers: old.followers.filter(follower => follower.user.username !== authCtx.user.username)
          }
        })
      } else {
        // Add user to followers list
        queryClient.setQueryData(['profile', username], old => {
          return {
            ...old, followers: [...old.followers, { user: authCtx.user }]
          }
        })
      }
      // Return a context object with the snapshotted value
      return { previousProfile }
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error, vars, context) => {
      toast.error(error.message)
      queryClient.setQueryData(['profile', username], context.previousProfile)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['profile', username])
    }
  })

  const button = {
    color: isFollowing ? 'pink' : 'blue',
    text: isFollowing ? 'Unfollow' : 'Follow'
  }

  return (

    <Button onClick={handleClick} variant='outline' size='sm' colorScheme={button.color}>{button.text}</Button>

  )
}

export default ToggleFollow
