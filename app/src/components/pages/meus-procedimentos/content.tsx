import { Box, Center, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import FormInput from 'components/molecules/forms/input'
import Table from 'components/pages/meus-procedimentos/table'
import { useState } from 'react'
import { MdSearchOff } from 'react-icons/md'

import { selectors, useSelector } from 'store'

export function Content() {
  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')

  const procedimentos = useSelector(state =>
    selectors.procedimento.getMeusProcedimentosBySearch(state)(term)
  )

  const handleSearch = (termo: string) => {
    setCurrentPage(1)
    setTerm(termo)
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
      {procedimentos.length > 0 ? (
        <Table
          procedimentos={procedimentos}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <Center flexDir="column" h="40vh">
          <Icon fontSize="45px" as={MdSearchOff} />
          <Text textAlign="center" maxW="300px" fontSize="14px">
            Nenhum procedimento encontrado.
          </Text>
        </Center>
      )}
    </Box>
  )
}
