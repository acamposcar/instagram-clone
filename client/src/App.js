import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import { ColorModeSwitcher } from './ColorModeSwitcher'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import theme from './theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import RequireAuth from './components/Auth/RequireAuth'
import RequireNotAuth from './components/Auth/RequireNotAuth'
import Profile from './pages/Profile'
import PostPage from './pages/PostPage'
import Explore from './pages/Explore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Layout from './components/Layout/Layout'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // show error for background refetches
      if (query.state.data !== undefined) {
        toast.error(`Something went wrong: ${error.message}`)
      }
    }
  })
})

const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <QueryClientProvider client={queryClient}>

        <ToastContainer />

        <Routes>
          <Route
            path='/login' element={
              <RequireNotAuth>
                <Login />
              </RequireNotAuth>
            }
          />
          <Route
            path='/register' element={
              <RequireNotAuth>
                <Register />
              </RequireNotAuth>
            }
          />
          <Route
            path='/' element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path='/posts/:postId' element={<PostPage />} />
            <Route path='/accounts/:username' element={<Profile />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/posts' element={<Navigate to='/' replace />} />
            <Route path='/*' element={<NotFound />} />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />

        {/* <ColorModeSwitcher justifySelf='flex-end' /> */}
      </QueryClientProvider>

    </ChakraProvider>

  )
}

export default App
