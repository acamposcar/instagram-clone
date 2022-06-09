import { useLocation, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = (props) => {
  const authCtx = useAuth()
  const location = useLocation()

  // if (!authCtx.isLoggedIn) { TODO: CHANGE THIS LINE
  if (authCtx.isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return props.children
}

export default RequireAuth
