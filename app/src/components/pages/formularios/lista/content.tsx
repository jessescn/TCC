import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import FormInput from 'components/molecules/forms/input'

import { Button } from 'components/atoms/button'
import FormulariosTable from 'components/pages/formularios/lista/table'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import { LoadingPage } from 'components/molecules/loading'

export function Content() {
  const navigate = useNavigate()

  const pagination = useSelector(selectors.formulario.getPagination)
  const isLoading = useSelector(selectors.formulario.isLoadingContent)

  const handleSearch = (termo: string) => {
    store.dispatch(
      actions.formulario.list({ ...pagination, page: 1, term: termo })
    )
  }

  return (
    <Box
      w="100%"
      h="100%"
      maxW="1200px"
      bgColor="initial.white"
      borderRadius="8px"
      px="24px"
      py="32px"
    >
      <Box>
        <Text fontWeight="bold" fontSize="28px" color="primary.dark">
          Formulários
        </Text>
        <Text my="16px" fontSize="14px">
          Crie ou edite formulários para vincular a tipos de procedimentos e que
          serão preenchidos pelos usuários ao criar um novo procedimento. Um
          formulário pode ser reutilizado em mais de um tipo de procedimento.
        </Text>
      </Box>
      <Divider my="24px" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="365px"
          height="35px"
          fontSize="14px"
          placeholder="Buscar por ID ou nome"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar formulários',
            props: {
              htmlFor: 'search',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }}
        />
        <Button
          fontSize="14px"
          mb={0}
          onClick={() => navigate('/formularios/edit')}
        >
          Novo Formulário
        </Button>
      </Flex>
      {isLoading ? <LoadingPage /> : <FormulariosTable />}
    </Box>
  )
}
