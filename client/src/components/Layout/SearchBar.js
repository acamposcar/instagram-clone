import React, { useState, useEffect, useCallback } from 'react'
import {
  Box, InputGroup, Input, InputLeftElement,
  useDisclosure,
  Spinner,
  Text,
  Center
} from '@chakra-ui/react'
import { ReactComponent as Search } from '../../assets/icons/search.svg'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { search } from '../../lib/api'
import useAuth from '../../hooks/useAuth'
import UserList from '../UserList'
import CustomModal from '../CustomModal'

const SearchBar = () => {
  const authCtx = useAuth()
  const [query, setQuery] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutate, isLoading, data, reset } = useMutation(search, {
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const submitRequest = useCallback((value) => {
    if (value === '') {
      // Reset mutation data
      reset()
      return
    }
    mutate({ token: authCtx.token, query: value })
  }, [mutate, authCtx.token, reset])

  const onChangeHandler = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    // Debeounce
    const debounceTimer = setTimeout(() => submitRequest(query), 400)
    return () => { clearTimeout(debounceTimer) }
  }, [query, submitRequest])

  const closeModalHandler = () => {
    setQuery('')
    onClose()
  }
  return (
    <>
      <CustomModal isOpen={isOpen} onClose={closeModalHandler} title='Search'>
        <Box as='form' px={8} marginTop={8} marginBottom={3}>
          <InputGroup>
            <InputLeftElement pointerEvents='none' height='34px'>
              <Search color='gray' />
            </InputLeftElement>
            <Input height='40px' autoFocus onChange={onChangeHandler} value={query} fontSize={17} backgroundColor='#EFEFEF' type='text' placeholder='Search' aria-label='Search Input' fontWeight={300} />
          </InputGroup>

          {data && data.length > 0 &&
            <UserList list={data} closeModal={closeModalHandler} />}
          {data && data.length === 0 && query &&
            <Center p={5}><Text>No results found</Text></Center>}
          {isLoading && <Center p={5}><Spinner /></Center>}
        </Box>
      </CustomModal>

      <Box as='button'>
        <Input height='34px' onClick={onOpen} fontSize={15} backgroundColor='#EFEFEF' type='text' placeholder='Search' aria-label='Search Input' fontWeight={300} readOnly />
      </Box>
    </>
  )
}

export default SearchBar
