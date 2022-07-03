import { Flex } from '@chakra-ui/react'
import Header from 'components/organisms/header'
import Sidebar from 'components/organisms/sidebar'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const location = useLocation()

  const user = localStorage.getItem('session_user')

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Flex>{children}</Flex>
    </>
  )
}

export default PrivateRoute
