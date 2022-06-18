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
import PostDetail from './pages/PostDetail'
import Explore from './pages/Explore'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MobileNavbar from './components/MobileNavbar'
const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/' element={
            <RequireAuth>
              <Header />

              <Home />
              <MobileNavbar />
            </RequireAuth>
          }
        />
        <Route
          path='/posts/:postId' element={
            <RequireAuth>
              <Header />
              <PostDetail />
              <MobileNavbar />

            </RequireAuth>
          }
        />
        <Route
          path='/accounts/:username' element={
            <RequireAuth>
              <Header />
              <Profile />
              <MobileNavbar />

            </RequireAuth>
          }
        />
        <Route
          path='/explore' element={
            <RequireAuth>
              <Header />
              <Explore />
              <MobileNavbar />

            </RequireAuth>
          }
        />
      </Routes>

      {/* <ColorModeSwitcher justifySelf='flex-end' /> */}

    </ChakraProvider>

  )
}

export default App
