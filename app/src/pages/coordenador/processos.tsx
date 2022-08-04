import { Box, Center, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import FormInput from 'components/molecules/forms/input'
import Table from 'components/pages/meus-processos/table'
import { useState } from 'react'
import { MdSearchOff } from 'react-icons/md'

import { selectors, useSelector } from 'store'

export default function ProcessosCoordenacao() {
  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')

  const processos = useSelector(state =>
    selectors.processo.getProcessosBySearch(state)(term)
  )

  const handleSearch = (termo: string) => {
    setCurrentPage(1)
    setTerm(termo)
  }

  return (
    <Screen py="24px">
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
            Processos
          </Text>
          <Text my="16px" fontSize="14px">
            Acompanhe todos os processos do sistema
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
              text: 'Buscar processos',
              props: {
                htmlFor: 'search',
                fontSize: '14px',
                fontWeight: 'bold'
              }
            }}
          />
        </Flex>
        {processos.length > 0 ? (
          <Table
            processos={processos}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <Center flexDir="column" h="40vh">
            <Icon fontSize="45px" as={MdSearchOff} />
            <Text textAlign="center" maxW="300px" fontSize="14px">
              Nenhum processo encontrado.
            </Text>
          </Center>
        )}
      </Box>
    </Screen>
  )
}
