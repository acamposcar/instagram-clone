import React from 'react'
import { Input, Box, useDisclosure, Button, VStack } from '@chakra-ui/react'
import CustomModal from '../../CustomModal'
import { ReactComponent as ShareIcon } from '../../../assets/icons/share.svg'
import { toast } from 'react-toastify'

const Share = ({ postId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const url = new URL(window.location.href)
  const postURL = `${url.protocol}//${url.host}/posts/${postId}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(postURL)
    toast.success('Copied to clipboard!')
    onClose()
  }
  return (
    <>
      <CustomModal isOpen={isOpen} onClose={onClose} title='Share'>
        <VStack gap={3} p={5} justifyContent='center'>
          <Input textAlign='center' readOnly value={postURL} autoFocus />
          <Button variant='ghost' onClick={copyToClipboard}>
            Copy Link
          </Button>
        </VStack>

      </CustomModal>
      <Box onClick={onOpen} as='button'>
        <ShareIcon css={{ '&:hover': { color: '#8e8e8e' } }} />
      </Box>
    </>
  )
}

export default Share
