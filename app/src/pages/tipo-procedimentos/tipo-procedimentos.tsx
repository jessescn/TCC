import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import FormInput from 'components/molecules/forms/input'
import SimpleTable from 'components/organisms/simple-table'
import { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdSearchOff } from 'react-icons/md'

import { format } from 'date-fns'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function TipoProcedimentos() {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [term, setTerm] = useState('')

  const tipoProcedimentos = useSelector(state =>
    selectors.tipoProcedimento.getTipoProcedimentosBySearch(state)(term)
  )

  const handleDelete = (id: number) => {
    store.dispatch(actions.tipoProcedimento.delete(id))
  }

  const handleUpdate = (id: number, data: Partial<TipoProcedimentoModel>) => {
    store.dispatch(actions.tipoProcedimento.update({ id, data }))
  }

  const getEditMenu = (tipo: TipoProcedimentoModel) => {
    const statusLabel = tipo.status === 'ativo' ? 'Inativar' : 'Ativar'
    const nextStatus = tipo.status === 'ativo' ? 'inativo' : 'ativo'

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          variant="unstyled"
          size="lg"
          icon={<Icon as={AiFillEdit} />}
        />
        <MenuList>
          <MenuItem
            onClick={() => navigate(`/tipo-procedimentos/edit?id=${tipo.id}`)}
          >
            Editar
          </MenuItem>
          {tipo.status !== 'rascunho' && (
            <MenuItem
              onClick={() =>
                handleUpdate(tipo.id, { ...tipo, status: nextStatus })
              }
            >
              {statusLabel}
            </MenuItem>
          )}
          <MenuItem onClick={() => handleDelete(tipo.id)}>Excluir</MenuItem>
        </MenuList>
      </Menu>
    )
  }

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
            Procediments Cadastrados
          </Text>
          <Text my="16px" fontSize="14px">
            Lista dos procedimentos cadastrados no sistema. Edite um
            procedimento aberto ou crie um novo para ser acessado pelos usuários
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
            color="initial.white"
            bgColor="primary.dark"
            fontSize="14px"
            onClick={() => navigate('/tipo-procedimentos/edit')}
            _hover={{ bgColor: 'primary.default' }}
          >
            Criar Novo Procedimento
          </Button>
        </Flex>
        {tipoProcedimentos.length > 0 ? (
          <Box
            mt="24px"
            borderColor="secondary.dark"
            borderWidth="1px"
            borderRadius="8px"
            p="16px"
          >
            <SimpleTable
              currentPage={currentPage}
              totalPages={Math.ceil(tipoProcedimentos.length / 5)}
              onChangePage={setCurrentPage}
              columns={[
                { content: 'ID', props: { width: '5%' } },
                { content: 'Nome', props: { width: '40%' } },
                { content: 'Status', props: { width: '5%' } },
                { content: 'Colegiado', props: { width: '10%' } },
                { content: 'Prazo Início', props: { width: '10%' } },
                { content: 'Prazo Fim', props: { width: '10%' } },
                { content: 'Última atualizacão', props: { width: '10%' } },
                { content: '', props: { width: '5%' } }
              ]}
              rows={tipoProcedimentos.map(tipo => [
                { content: tipo.id },
                { content: tipo.nome },
                { content: tipo.status },
                { content: tipo.colegiado ? 'Sim' : 'Não' },
                {
                  content: !tipo.dataInicio
                    ? '-'
                    : format(new Date(tipo.dataInicio), 'dd/MM/yyyy')
                },
                {
                  content: !tipo.dataFim
                    ? '-'
                    : format(new Date(tipo.dataFim), 'dd/MM/yyyy')
                },
                {
                  content: !tipo.updatedAt
                    ? '-'
                    : format(new Date(tipo.updatedAt), 'dd/MM/yyyy')
                },
                { content: getEditMenu(tipo) }
              ])}
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
