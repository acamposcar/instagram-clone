
import React from 'react'
import { Button, Input } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa'

const ImageForm = ({ handleFileSelection, file, children }) => {
  return (
    <>
      {!file.preview &&
        <Button as='label' htmlFor='image' cursor='pointer' leftIcon={<FaCloudUploadAlt size={20} />}>
          Select File
          <Input
            type='file'
            accept='.jpg,.png,.jpeg'
            hidden
            name='image'
            id='image'
            onChange={handleFileSelection}
            required
          />
        </Button>}
      {file.preview && children}
    </>
  )
}

export default ImageForm
