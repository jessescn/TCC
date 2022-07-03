import { Box, Center, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import FormInput from 'components/molecules/forms/input'
import SimpleTable from 'components/organisms/simple-table'
import { useEffect, useState } from 'react'
import { MdSearchOff } from 'react-icons/md'

import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'

export default function MeusProcessos() {
  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')

  const processos = useSelector(state =>
    selectors.processo.getProcessosBySearch(state)(term)
  )

  useEffect(() => {
    store.dispatch(actions.processo.list())
  }, [])

  const handleSearch = (termo: string) => {
    console.log(termo)

    setCurrentPage(1)
    setTerm(termo)
  }

  return (
    <Screen py="24px">
      <Box
        w="100%"
        h="100%"
        maxW="1392px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <Box>
          <Text fontWeight="bold" fontSize="28px" color="primary.dark">
            Meus Processos
          </Text>
          <Text my="16px" fontSize="14px">
            Acompanhe os seus processos em aberto ou finalizados
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
          <Box
            mt="24px"
            borderColor="secondary.dark"
            borderWidth="1px"
            borderRadius="8px"
            p="16px"
          >
            <SimpleTable
              currentPage={currentPage}
              totalPages={Math.ceil(processos.length / 5)}
              onChangePage={setCurrentPage}
              columns={[
                { content: 'ID', props: { width: '10%' } },
                { content: 'Nome', props: { width: '60%' } },
                { content: 'Status', props: { width: '10%' } },
                { content: 'Criado em', props: { width: '15%' } }
              ]}
              rows={processos.map(processo => [
                { content: processo.id },
                { content: processo.nome },
                { content: processo.status },
                {
                  content: !processo.createdAt
                    ? ''
                    : formatDate(processo.createdAt)
                }
              ])}
            />
          </Box>
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
