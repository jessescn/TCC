import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import FormInput from 'components/molecules/forms/input'

import { Button } from 'components/atoms/button'
import FormulariosTable from 'components/pages/formularios/table'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

export function Content() {
  const navigate = useNavigate()

  const pagination = useSelector(state => state.formulario.pagination)

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
          Crie um modelo de formulário para utilizar em procedimentos
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
      <Box
        mt="24px"
        borderColor="secondary.dark"
        borderWidth="1px"
        borderRadius="8px"
        p="16px"
      >
        <FormulariosTable />
      </Box>
    </Box>
  )
}
