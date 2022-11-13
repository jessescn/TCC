import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import FormInput from 'components/molecules/forms/input'
import Table from 'components/pages/procedimentos/lista/table'

import { actions, selectors, store, useSelector } from 'store'

export function Content() {
  const pagination = useSelector(selectors.meusProcedimentos.getPagination)

  const handleSearch = (termo: string) => {
    store.dispatch(
      actions.meusProcedimentos.list({ ...pagination, page: 1, term: termo })
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
          Meus Procedimentos
        </Text>
        <Text my="16px" fontSize="14px">
          Acompanhe os seus procedimentos dentro do sistema
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
            text: 'Buscar procedimentos',
            props: {
              htmlFor: 'search',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }}
        />
      </Flex>
      <Table />
    </Box>
  )
}
