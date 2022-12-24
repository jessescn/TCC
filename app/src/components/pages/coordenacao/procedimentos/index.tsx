import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import { Title } from 'components/atoms/title'
import FormInput from 'components/molecules/forms/input'
import { LoadingPage } from 'components/molecules/loading'
import { actions, selectors, store, useSelector } from 'store'
import TodosProcedimentosTable from './table'

export default function TodosProcedimentosList() {
  const pagination = useSelector(selectors.procedimento.getPagination)
  const isLoading = useSelector(selectors.procedimento.isLoadingContent)

  const handleSearch = (termo: string) => {
    store.dispatch(
      actions.procedimento.list({ ...pagination, page: 1, term: termo })
    )
  }

  return (
    <Container>
      <Box>
        <Title>Procedimentos</Title>
        <Text my="1rem" fontSize="sm">
          Acompanhe todos os procedimentos do sistema. Para mais detalhes,
          clique em um dos elementos listados.
        </Text>
      </Box>
      <Divider my="1.5rem" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="400px"
          height="2rem"
          fontSize="sm"
          placeholder="Ex.Busca por ID ou nome"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar procedimentos',
            props: {
              htmlFor: 'search',
              fontSize: 'sm',
              fontWeight: 'bold'
            }
          }}
        />
      </Flex>
      {isLoading ? <LoadingPage /> : <TodosProcedimentosTable />}
    </Container>
  )
}
