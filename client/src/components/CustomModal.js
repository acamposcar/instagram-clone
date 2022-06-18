import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'

const CustomModal = ({ title, children, isOpen, onClose, minW = '400px' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={{ md: { minW }, base: '320px' }} borderRadius='8px'>
        <ModalHeader textAlign='center' fontSize={15} borderBottom='1px solid var(--borderColor)'>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
