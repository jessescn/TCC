import { Box, Flex } from '@chakra-ui/react'
import Header from 'components/organisms/header'
import Sidebar from 'components/organisms/sidebar'
import { User } from 'domain/entity/user'
import { UserModel } from 'domain/models/user'
import { ProfileType } from 'domain/types/actors'
import { useStore } from 'hooks/useStore'
import { Navigate, useLocation } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

type Props = {
  children: JSX.Element
  allowedProfiles?: ProfileType[]
}

function PrivateRoute({ children, allowedProfiles = [] }: Props) {
  const location = useLocation()

  useStore(['procedimento', 'tipoProcedimento', 'formulario'])

  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)

  const user = localStorage.getItem('session_user')

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const userModel: UserModel = JSON.parse(user)
  const isAdmin = userModel.profile.nome === 'admin'

  const isAllowed =
    isAdmin ||
    (allowedProfiles.length > 0
      ? User.includesInProfiles(userModel, allowedProfiles)
      : true)

  if (!isAllowed) {
    return <Navigate to="/404" state={{ from: location }} replace />
  }

  function closeSidebar() {
    if (isSidebarOpen) {
      store.dispatch(actions.session.closeSidebar())
    }
  }

  return (
    <Box position="relative">
      <Box position="absolute" top="0" left="0" right="0">
        <Header />
      </Box>
      <Box
        position="absolute"
        top="72px"
        left="0"
        right="0"
        overflowY="scroll"
        height="calc(100vh - 72px)"
      >
        <Sidebar />
        <Flex onClick={closeSidebar}>{children}</Flex>
      </Box>
    </Box>
  )
}

export default PrivateRoute
