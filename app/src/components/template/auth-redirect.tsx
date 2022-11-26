import { UserModel } from 'domain/models/user'
import { Navigate, useLocation } from 'react-router-dom'

type Props = {
  children: JSX.Element
  redirectTo: string
}

function AuthRedirect({ children, redirectTo }: Props) {
  const location = useLocation()

  const user = localStorage.getItem('session_user')
  const userModel = user ? (JSON.parse(user) as UserModel) : undefined

  if (userModel && userModel.verificado) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

export default AuthRedirect
