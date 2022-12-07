import { Box, Center, Flex, Link, Text } from '@chakra-ui/react'
import { LoadingPage } from 'components/molecules/loading'
import LogoPanel from 'components/organisms/logo-panel'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

export const Content = () => {
  const navigate = useNavigate()
  const status = useSelector(state => state.session.exchangeCodeStatus)
  const isExchangeSuccess = status.status === 'success'
  const isExchangeFailure = status.status === 'failure'

  const isFetching = !(isExchangeSuccess || isExchangeFailure)

  const handleRedirect = () => {
    store.dispatch(actions.session.logout({ reload: false }))
    navigate('/login')
  }

  return isFetching ? (
    <LoadingPage />
  ) : (
    <Flex
      w="100%"
      maxW="800px"
      bgColor="initial.white"
      borderRadius="8px"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <LogoPanel side="left" />
      <Box p={4} w="calc(100% - 350px)">
        {isExchangeSuccess && (
          <Center flexDirection="column" h="100%">
            <Text
              textAlign="center"
              fontSize="20px"
              fontWeight="bold"
              color="info.success"
            >
              Email verificado com sucesso! Você já pode fechar essa aba e
              realizar login normalmente.
            </Text>
            <Center mt="16px" fontSize="12px">
              <Link onClick={handleRedirect}>Voltar para o login</Link>
            </Center>
          </Center>
        )}
        {isExchangeFailure && (
          <Center flexDirection="column" h="100%">
            <Text
              textAlign="center"
              fontSize="20px"
              fontWeight="bold"
              color="info.error"
            >
              {status.message}
            </Text>
          </Center>
        )}
      </Box>
    </Flex>
  )
}
