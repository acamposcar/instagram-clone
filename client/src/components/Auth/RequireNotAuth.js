import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireNotAuth = (props) => {
  const authCtx = useAuth()

  if (authCtx.isLoggedIn) {
    // Redirect them to the /home page
    return <Navigate to='/' replace />
  }

  return props.children
}

export default RequireNotAuth
