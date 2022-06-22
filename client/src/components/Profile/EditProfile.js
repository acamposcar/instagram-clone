
import React from 'react'
import { Button, useDisclosure, Box, VStack } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { updateProfile } from '../../lib/api'
import CustomModal from '../CustomModal'
import TextInput from '../Form/UI/TextInput'
import { validators } from '../../utils/validators'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const EditProfile = ({ user }) => {
  const authCtx = useAuth()

  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateProfile, {
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['profile', user.username])
      authCtx.updateUser(data)
      onClose()
    }
  })

  const onSubmit = (data) => {
    mutate({ token: authCtx.token, username: authCtx.user.username, profileData: data })
  }

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} title='Edit profile'>
        <Box as='form' onSubmit={handleSubmit(onSubmit)} p={3} my={5}>
          <VStack gap={2} maxW='300px' mx='auto'>
            <TextInput fieldName='username' register={register} validators={validators.username} errors={formErrors.username} defaultValue={user.username} readOnly />
            <TextInput fieldName='name' register={register} validators={validators.name} errors={formErrors.name} autoFocus defaultValue={user.name} />
            <TextInput fieldName='bio' register={register} validators={{}} errors={formErrors.bio} focus defaultValue={user.bio} />
            <Button isLoading={isLoading} type='submit' w='100%'>Save</Button>
          </VStack>
        </Box>
      </CustomModal>
      <Button onClick={onOpen} size='sm' borderColor='gray.400' colorScheme='gray' variant='outline'>Edit profile</Button>
    </>
  )
}

export default EditProfile
