import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import { Title } from 'components/atoms/title'
import FormInput from 'components/molecules/forms/input'
import { LoadingPage } from 'components/molecules/loading'
import MeusProcedimentosTable from 'components/pages/meus-procedimentos/lista/table'
import { debounce } from 'lodash'

import { actions, selectors, store, useSelector } from 'store'

export default function MeusProcedimentosList() {
  const pagination = useSelector(selectors.meusProcedimentos.getPagination)
  const isLoading = useSelector(selectors.meusProcedimentos.isLoadingContent)

  const handleSearch = debounce((termo: string) => {
    store.dispatch(
      actions.meusProcedimentos.list({ ...pagination, page: 1, term: termo })
    )
  }, 700)

  return (
    <Container>
      <Box>
        <Title>Meus Procedimentos</Title>
        <Text my="1rem" fontSize="sm">
          Acompanhe os seus procedimentos dentro do sistema. Para mais detalhes,
          clique em um dos elementos listados
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
      {isLoading ? <LoadingPage /> : <MeusProcedimentosTable />}
    </Container>
  )
}
