import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import FormInput from 'components/molecules/forms/input'
import { useEffect, useState } from 'react'
import { MdSearchOff } from 'react-icons/md'

import FormulariosTable from 'components/pages/formularios/table'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function Formularios() {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')

  const formularios = useSelector(state =>
    selectors.form.getFormulariosBySearch(state)(term)
  )

  useEffect(() => {
    store.dispatch(actions.form.list())
  }, [])

  const handleSearch = (termo: string) => {
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
            Formulários
          </Text>
          <Text my="16px" fontSize="14px">
            Crie um modelo de formulário para utilizar em processos
          </Text>
        </Box>
        <Divider my="24px" borderColor="secondary.dark" />
        <Flex justifyContent="space-between" alignItems="flex-end">
          <FormInput
            id="search"
            maxW="365px"
            height="35px"
            fontSize="14px"
            placeholder="Ex.Busca por ID, nome, autor e status"
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
            color="initial.white"
            bgColor="primary.dark"
            fontSize="14px"
            onClick={() => navigate('/formularios/edit')}
            _hover={{ bgColor: 'primary.default' }}
          >
            Novo Formulário
          </Button>
        </Flex>
        {formularios.length > 0 ? (
          <Box
            mt="24px"
            borderColor="secondary.dark"
            borderWidth="1px"
            borderRadius="8px"
            p="16px"
          >
            <FormulariosTable
              formularios={formularios}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Box>
        ) : (
          <Center flexDir="column" h="40vh">
            <Icon fontSize="45px" as={MdSearchOff} />
            <Text textAlign="center" maxW="300px" fontSize="14px">
              Nenhum formulário encontrado. Clique em 'Novo Formulário' para
              construir um novo modelo
            </Text>
          </Center>
        )}
      </Box>
    </Screen>
  )
}
