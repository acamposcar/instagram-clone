
import React, { useEffect, useState } from 'react'
import { Button, useDisclosure, Box, VStack } from '@chakra-ui/react'
import useHttp from '../../hooks/useHttp'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-toastify'
import { updateProfile } from '../../lib/api'
import CustomModal from '../CustomModal'
import TextInput from '../Form/UI/TextInput'
import { validators } from '../../utils/validators'
import { useForm } from 'react-hook-form'

const EditProfile = ({ onProfileUpdate, user }) => {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
  const [updatedProfile, setUpdatedProfile] = useState()
  const { sendRequest, loading, error, success } = useHttp(updateProfile, false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const authCtx = useAuth()

  const onSubmit = (data) => {
    setUpdatedProfile(data)
    sendRequest({ token: authCtx.token, username: authCtx.user.username, profileData: data })
  }

  useEffect(() => {
    if (success) {
      onProfileUpdate(updatedProfile)
      onClose()
    }
  }, [success, onClose, onProfileUpdate, updatedProfile])

  useEffect(() => {
    toast.error(error)
  }, [error])

  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} title='Edit profile'>
        <Box as='form' onSubmit={handleSubmit(onSubmit)} p={3} my={5}>
          <VStack gap={2} maxW='300px' mx='auto'>
            <TextInput fieldName='username' register={register} validators={validators.username} errors={formErrors.username} defaultValue={user.username} readOnly />
            <TextInput fieldName='name' register={register} validators={validators.name} errors={formErrors.name} autoFocus defaultValue={user.name} />
            <TextInput fieldName='bio' register={register} validators={{}} errors={formErrors.bio} focus defaultValue={user.bio} />
            <Button isLoading={loading} type='submit' w='100%'>Save</Button>
          </VStack>
        </Box>
      </CustomModal>
      <Button onClick={onOpen} size='sm' colorScheme='gray' variant='outline'>Edit profile</Button>
    </>
  )
}

export default EditProfile
