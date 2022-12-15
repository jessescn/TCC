import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import FormInput from 'components/molecules/forms/input'
import { LoadingPage } from 'components/molecules/loading'

import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import Table from './table'

export function Content() {
  const navigate = useNavigate()

  const pagination = useSelector(selectors.tipoProcedimento.getPagination)
  const isLoading = useSelector(selectors.tipoProcedimento.isLoadingContent)

  const handleSearch = (termo: string) => {
    store.dispatch(
      actions.tipoProcedimento.list({ ...pagination, page: 1, term: termo })
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
          Tipos de Procedimentos Cadastrados
        </Text>
        <Text my="16px" fontSize="14px">
          Lista dos procedimentos cadastrados no sistema. Edite um procedimento
          aberto ou crie um novo para ser acessado pelos usuários
        </Text>
      </Box>
      <Divider my="24px" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="365px"
          height="35px"
          fontSize="14px"
          placeholder="Ex.Busca por ID, nome e status"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar procedimentos cadastrados',
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
          px={6}
          onClick={() => navigate('/tipo-procedimentos/edit')}
        >
          Novo Tipo de Procedimento
        </Button>
      </Flex>
      {isLoading ? <LoadingPage /> : <Table />}
    </Box>
  )
}
