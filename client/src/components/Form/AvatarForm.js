
import React, { useState } from 'react'
import { Flex, Button, Avatar } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import ImageForm from './ImageForm'
import { toast } from 'react-toastify'
import { updateAvatar } from '../../services/userAPI'
import { useMutation, useQueryClient } from 'react-query'

const AvatarForm = ({ closeModal }) => {
  const [file, setFile] = useState({ preview: undefined, data: undefined })
  const authCtx = useAuth()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateAvatar, {
    onError: (error) => {
      toast.error(error.message)
      setFile({ preview: undefined, data: undefined })
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(['profile', authCtx.user.username])
      authCtx.updateUser({ avatar: response.data })
      closeModal()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file.data) {
      toast.error('Select a file')
      return
    }
    const formData = new FormData()
    formData.append('file', file.data)
    formData.append('upload_preset', 'insta-clone')

    mutate({ formData, token: authCtx.token })
  }

  const handleFileSelection = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    })
  }

  return (
    <Flex as='form' onSubmit={handleSubmit} flexDirection='column' alignItems='center' justifyContent='center' my={5}>
      <ImageForm handleFileSelection={handleFileSelection} file={file}>
        <Avatar boxSize='200px' src={file.preview} alt='' />
      </ImageForm>
      <Button isLoading={isLoading} marginTop={5} variant='ghost' fontSize={16} type='submit'>Save</Button>
    </Flex>

  )
}

export default AvatarForm
