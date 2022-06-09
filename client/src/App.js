import React, { useContext } from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import Login from './pages/Login'
import Register from './pages/Register'

import Home from './pages/Home'
import theme from './theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AuthContext from './store/auth-context'
const App = () => {
  const authCtx = useContext(AuthContext)

  return (
    <ChakraProvider theme={theme} resetCSS>
      <Box fontSize={15}>
        {!authCtx.isLoggedIn &&
          <Box marginTop='min(60px, 9vh)' display='flex' justifyContent='center'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />

            </Routes>
          </Box>}

        {authCtx.isLoggedIn &&
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>}
        <ColorModeSwitcher justifySelf='flex-end' />

      </Box>
    </ChakraProvider>

  )
}

export default App
