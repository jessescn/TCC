import { Box, Center, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import FormInput from 'components/molecules/forms/input'
import { useState } from 'react'
import { MdSearchOff } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import { selectors, useSelector } from 'store'
import Table from './table'

export function Content() {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')

  const tipoProcedimentos = useSelector(state =>
    selectors.tipoProcedimento.getTipoProcedimentosBySearch(state)(term)
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
      {tipoProcedimentos.length > 0 ? (
        <Table
          currentPage={currentPage}
          tipoProcedimentos={tipoProcedimentos}
          setCurrentPage={setCurrentPage}
        />
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
  )
}
