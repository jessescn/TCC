import { Box, Flex } from '@chakra-ui/react'
import Header from 'components/organisms/header'
import Sidebar from 'components/organisms/sidebar'
import { Navigate, useLocation } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)

  const user = localStorage.getItem('session_user')

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
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
