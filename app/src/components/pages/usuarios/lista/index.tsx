import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import { Title } from 'components/atoms/title'
import FormInput from 'components/molecules/forms/input'
import { LoadingPage } from 'components/molecules/loading'
import { actions, selectors, store, useSelector } from 'store'
import UsuariosTable from './table'
import UploadUsuariosButton from './upload-usuarios'

export default function UsuariosList() {
  const pagination = useSelector(selectors.user.getPagination)
  const isLoading = useSelector(selectors.user.isLoadingContent)

  const handleSearch = (termo: string) => {
    store.dispatch(actions.user.list({ ...pagination, page: 1, term: termo }))
  }

  return (
    <Container>
      <Box>
        <Title>Gerenciamento de Usuários</Title>
        <Text my="1rem" fontSize="sm">
          Lista de todos os usuários do sistema.
        </Text>
      </Box>
      <Divider my="1.5rem" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="400px"
          height="2rem"
          fontSize="sm"
          placeholder="Ex.Busca por ID, nome e email"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar usuários cadastrados',
            props: {
              htmlFor: 'search',
              fontSize: 'sm',
              fontWeight: 'bold'
            }
          }}
        />
        <UploadUsuariosButton />
      </Flex>
      {isLoading ? <LoadingPage /> : <UsuariosTable />}
    </Container>
  )
}
