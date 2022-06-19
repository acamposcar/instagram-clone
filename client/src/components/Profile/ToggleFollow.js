
import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { toggleFollow } from '../../lib/api'
import { useMutation, useQueryClient } from 'react-query'

const ToggleFollow = ({ username, followers }) => {
  const authCtx = useAuth()
  const queryClient = useQueryClient()

  // Check if auth user is in the followers list
  const [isFollowingState, setIsFollowingState] = useState(!!followers.find(follower => follower.user.username === authCtx.user.username))

  const handleClick = () => {
    mutate({ token: authCtx.token, username })
  }

  const { mutate } = useMutation(toggleFollow, {
    // Optimistic update: https://react-query.tanstack.com/guides/optimistic-updates
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['profile', username])

      const previousProfile = queryClient.getQueryData(['profile', username])
      const previousState = isFollowingState

      // Optimistically update to the new value
      if (isFollowingState) {
        setIsFollowingState(false)
        // Delete user from followers list
        queryClient.setQueryData(['profile', username], old => {
          return {
            ...old, followers: old.followers.filter(follower => follower.user.username !== authCtx.user.username)
          }
        })
      } else {
        setIsFollowingState(true)
        // Add user to followers list
        queryClient.setQueryData(['profile', username], old => {
          return {
            ...old, followers: [...old.followers, { user: authCtx.user }]
          }
        })
      }
      // Return a context object with the snapshotted value
      return { previousProfile, previousState }
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (error, vars, context) => {
      toast.error(error.message)
      setIsFollowingState(context.previousState)
      queryClient.setQueryData(['profile', username], context.previousProfile)
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['profile', username])
    }
  })

  const button = {
    color: isFollowingState ? 'pink' : 'blue',
    text: isFollowingState ? 'Unfollow' : 'Follow'
  }

  return (

    <Button onClick={handleClick} size='sm' colorScheme={button.color}>{button.text}</Button>

  )
}

export default ToggleFollow
