import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import FormInput from 'components/molecules/forms/input'

import { Button } from 'components/atoms/button'
import FormulariosTable from 'components/pages/formularios/lista/table'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import { LoadingPage } from 'components/molecules/loading'
import { debounce } from 'lodash'
import { Container } from 'components/atoms/container'
import { Title } from 'components/atoms/title'

export default function FormulariosList() {
  const navigate = useNavigate()

  const pagination = useSelector(selectors.formulario.getPagination)
  const isLoading = useSelector(selectors.formulario.isLoadingContent)

  const handleSearch = debounce((termo: string) => {
    store.dispatch(
      actions.formulario.list({ ...pagination, page: 1, term: termo })
    )
  }, 700)

  return (
    <Container>
      <Box>
        <Title>Formulários</Title>
        <Text my="1rem" fontSize="sm">
          Crie ou edite formulários para vincular a tipos de procedimentos e que
          serão preenchidos pelos usuários ao criar um novo procedimento. Um
          formulário pode ser reutilizado em mais de um tipo de procedimento.
        </Text>
      </Box>
      <Divider my="1.5rem" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="400px"
          height="2rem"
          fontSize="sm"
          placeholder="Buscar por ID ou nome"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar formulários',
            props: {
              htmlFor: 'search',
              fontSize: 'sm',
              fontWeight: 'bold'
            }
          }}
        />
        <Button size="sm" onClick={() => navigate('/formularios/edit')}>
          Novo Formulário
        </Button>
      </Flex>
      {isLoading ? <LoadingPage /> : <FormulariosTable />}
    </Container>
  )
}
