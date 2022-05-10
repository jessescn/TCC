import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from '../store'

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useSelector(state => state.session.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
