import {
  Box,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { format } from 'date-fns'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'

type Props = {
  tipoProcedimentos: TipoProcedimentoModel[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Table = ({ tipoProcedimentos, currentPage, setCurrentPage }: Props) => {
  const navigate = useNavigate()

  const sorted = [...tipoProcedimentos]

  sorted.sort(function (a, b) {
    return a.id - b.id
  })

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
              onClick={() => handleUpdate(tipo.id, { status: nextStatus })}
            >
              {statusLabel}
            </MenuItem>
          )}
          <MenuItem onClick={() => handleDelete(tipo.id)}>Excluir</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return (
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
  )
}

export default Table
