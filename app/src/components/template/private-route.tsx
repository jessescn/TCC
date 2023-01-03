import { Box, Center, Flex } from '@chakra-ui/react'
import { LoadingPage } from 'components/molecules/loading'
import Header from 'components/organisms/header'
import Sidebar from 'components/organisms/sidebar'
import { Actor } from 'domain/entity/actor'
import { UserModel } from 'domain/models/user'
import { ProfileType } from 'domain/types/actors'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

type Props = {
  children: JSX.Element
  allowedProfiles?: ProfileType[]
}

function PrivateRoute({ children, allowedProfiles = [] }: Props) {
  const location = useLocation()

  const isSidebarOpen = useSelector(state => state.session.isSidebarOpen)
  const authStatus = useSelector(state => state.session.authStatus)
  const isAuthenticating = authStatus === 'loading'

  const user = localStorage.getItem('session_user')

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  const userModel: UserModel = JSON.parse(user)
  const isAdmin = userModel.profile.nome === 'admin'

  const hasProfiles =
    allowedProfiles.length > 0
      ? Actor.includesInProfiles(userModel, allowedProfiles)
      : true

  const isVerified = userModel.verificado

  const isAllowed = (isAdmin || hasProfiles) && isVerified

  if (!isAllowed) {
    return <Navigate to="/404" state={{ from: location }} replace />
  }

  useEffect(() => {
    store.dispatch(actions.session.sidebarInfo())
    store.dispatch(actions.session.me())
  }, [])

  useEffect(() => {
    if (authStatus === 'failure') {
      store.dispatch(actions.session.logout({ reload: true }))
    }
  }, [authStatus])

  function closeSidebar() {
    if (isSidebarOpen) {
      store.dispatch(actions.session.closeSidebar())
    }
  }

  return isAuthenticating ? (
    <Center h="100vh">
      <LoadingPage />
    </Center>
  ) : (
    <Box position="relative">
      <Box position="absolute" top="0" left="0" right="0">
        <Header />
      </Box>
      <Box
        position="absolute"
        top="56px"
        left="0"
        right="0"
        overflowY="scroll"
        height="calc(100vh - 56px)"
      >
        <Sidebar />
        <Flex onClick={closeSidebar}>{children}</Flex>
      </Box>
    </Box>
  )
}

export default PrivateRoute
