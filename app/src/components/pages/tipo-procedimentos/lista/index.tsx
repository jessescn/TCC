import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { Container } from 'components/atoms/container'
import { Title } from 'components/atoms/title'
import FormInput from 'components/molecules/forms/input'
import { LoadingPage } from 'components/molecules/loading'
import { MdAdd } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import TipoProcedimentosTable from './table'

export default function TipoProcedimentosList() {
  const navigate = useNavigate()

  const pagination = useSelector(selectors.tipoProcedimento.getPagination)
  const isLoading = useSelector(selectors.tipoProcedimento.isLoadingContent)

  const handleSearch = (termo: string) => {
    store.dispatch(
      actions.tipoProcedimento.list({ ...pagination, page: 1, term: termo })
    )
  }

  return (
    <Container>
      <Box>
        <Title>Tipos de Procedimentos</Title>
        <Text my="1rem" fontSize="sm">
          Um tipo de procedimento é um processo que será preenchido pelo
          usuário. Vincule um ou mais formulários que deverão ser preenchidos
          pelo usuário ao submeter o procedimento.
        </Text>
      </Box>
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
            text: 'Buscar procedimentos cadastrados',
            props: {
              htmlFor: 'search',
              fontSize: 'sm',
              fontWeight: 'bold'
            }
          }}
        />
        <Button
          leftIcon={<Icon boxSize={5} as={MdAdd} />}
          size="sm"
          onClick={() => navigate('/tipo-procedimentos/edit')}
        >
          Novo Tipo Procedimento
        </Button>
      </Flex>
      {isLoading ? <LoadingPage default /> : <TipoProcedimentosTable />}
    </Container>
  )
}
