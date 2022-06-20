
import React, { useState } from 'react'
import { Flex, Button, Avatar } from '@chakra-ui/react'
import useAuth from '../../hooks/useAuth'
import ImageForm from './ImageForm'
import { toast } from 'react-toastify'
import { updateAvatar } from '../../lib/api'
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
      authCtx.updateUser({ avatar: `/uploads/avatar/${response.data}` })
      closeModal()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('avatar', file.data)
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
        <Avatar height='200px' width='200px' src={file.preview} alt='' />
      </ImageForm>
      <Button isLoading={isLoading} marginTop={5} variant='ghost' fontSize={16} type='submit'>Save</Button>
    </Flex>

  )
}

export default AvatarForm
