import { Divider, Flex, Text } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import { Title } from 'components/atoms/title'
import FormInput from 'components/molecules/forms/input'
import { LoadingPage } from 'components/molecules/loading'
import ProcedimentosHomologacaoTable from 'components/pages/colegiado/homologacao-lista/table'
import { debounce } from 'lodash'
import { actions, selectors, store, useSelector } from 'store'

export default function ProcessosHomologacaoList() {
  const pagination = useSelector(selectors.colegiado.getPagination)
  const isLoading = useSelector(selectors.colegiado.isLoadingContent)

  const handleSearch = debounce((termo: string) => {
    store.dispatch(
      actions.colegiado.list({ ...pagination, page: 1, term: termo })
    )
  }, 700)

  return (
    <Container>
      <Title>Procedimentos em homologação</Title>
      <Text my="1rem" fontSize="sm">
        Acompanhe os procedimentos que estão sendo votados pelo colegiado.
      </Text>
      <Divider my="1.5rem" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="400px"
          height="2rem"
          fontSize="sm"
          placeholder="Ex.Busca por ID, nome e status"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar procedimentos em homologacão',
            props: {
              htmlFor: 'search',
              fontSize: 'sm',
              fontWeight: 'bold'
            }
          }}
        />
      </Flex>
      {isLoading ? <LoadingPage default /> : <ProcedimentosHomologacaoTable />}
    </Container>
  )
}
