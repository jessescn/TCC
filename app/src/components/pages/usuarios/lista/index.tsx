import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import FormInput from 'components/molecules/forms/input'
import { actions, selectors, store, useSelector } from 'store'
import Table from './table'

export const Content = () => {
  const pagination = useSelector(selectors.user.getPagination)

  const handleSearch = (termo: string) => {
    store.dispatch(actions.user.list({ ...pagination, page: 1, term: termo }))
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
          Gerenciamento de Usuários
        </Text>
        <Text my="16px" fontSize="14px">
          Lista de todos os usuários do sistema.
        </Text>
      </Box>
      <Divider my="24px" borderColor="secondary.dark" />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <FormInput
          id="search"
          maxW="365px"
          height="35px"
          fontSize="14px"
          placeholder="Ex.Busca por ID, nome e email"
          onChange={e => handleSearch(e.target.value)}
          label={{
            text: 'Buscar usuários cadastrados',
            props: {
              htmlFor: 'search',
              fontSize: '14px',
              fontWeight: 'bold'
            }
          }}
        />
        {/* <Button
          fontSize="14px"
          mb={0}
          px={6}
          onClick={() => navigate('/tipo-procedimentos/edit')}
        >
          Novo Tipo de Procedimento
        </Button> */}
      </Flex>
      <Table />
    </Box>
  )
}
