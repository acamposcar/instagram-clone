import React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import Header from './components/Header'
import theme from './theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

function App () {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Header />} />
      </Routes>
      <Box textAlign='center' fontSize='xl'>
        <ColorModeSwitcher justifySelf='flex-end' />
      </Box>
    </ChakraProvider>
  )
}

export default App
