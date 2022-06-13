import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import theme from './theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import RequireAuth from './components/Auth/RequireAuth'
import Profile from './pages/Profile'

const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

      <Routes>
        <Route
          path='/' element={
            <RequireAuth>
              <Header />
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path='/accounts/:id' element={
            <RequireAuth>
              <Header />
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
      {/* <ColorModeSwitcher justifySelf='flex-end' /> */}

    </ChakraProvider>

  )
}

export default App
