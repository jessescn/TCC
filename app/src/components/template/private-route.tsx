import { Box, Flex } from '@chakra-ui/react'
import Header from 'components/organisms/header'
import Sidebar from 'components/organisms/sidebar'
import { UserModel } from 'domain/models/user'
import { Roles } from 'domain/types/actors'
import { Navigate, useLocation } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

type Props = {
  children: JSX.Element
  requiredRoles?: Roles[]
}

function PrivateRoute({ children, requiredRoles = [] }: Props) {
  const location = useLocation()
  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)

  const user = localStorage.getItem('session_user')

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const userModel: UserModel = JSON.parse(user)

  const haveRequiredRoles = requiredRoles.reduce((havePermission, role) => {
    const haveRole = userModel.roles.includes(role)

    if (!haveRole) {
      return false
    }

    return havePermission && haveRole
  }, true)

  if (!haveRequiredRoles) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  function closeSidebar() {
    if (isSidebarOpen) {
      store.dispatch(actions.session.closeSidebar())
    }
  }

  return (
    <Box>
      <Header />
      <Sidebar />
      <Flex onClick={closeSidebar}>{children}</Flex>
    </Box>
  )
}

export default PrivateRoute
