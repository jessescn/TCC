import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import FormInput from 'components/molecules/forms/input'
import { LoadingPage } from 'components/molecules/loading'
import { actions, selectors, store, useSelector } from 'store'
import Table from './table'

export const Content = () => {
  const pagination = useSelector(selectors.procedimento.getPagination)
  const isLoading = useSelector(selectors.procedimento.isLoadingContent)

  const handleSearch = (termo: string) => {
    store.dispatch(
      actions.procedimento.list({ ...pagination, page: 1, term: termo })
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
          Procedimentos
        </Text>
        <Text my="16px" fontSize="14px">
          Acompanhe todos os procedimentos do sistema
        </Text>
      </Box>
      <Divider my="24px" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="365px"
          height="35px"
          fontSize="14px"
          placeholder="Ex.Busca por ID ou nome"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar procedimentos',
            props: {
              htmlFor: 'search',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }}
        />
      </Flex>
      {isLoading ? <LoadingPage /> : <Table />}
    </Box>
  )
}
