import {
  Box,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure
} from '@chakra-ui/react'
import ConfirmModal from 'components/organisms/confirm-modal'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { format } from 'date-fns'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'

type Props = {
  tipoProcedimentos: TipoProcedimentoModel[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

type Update = {
  id: number
  data: Partial<TipoProcedimentoModel>
}

const Table = ({ tipoProcedimentos, currentPage, setCurrentPage }: Props) => {
  const navigate = useNavigate()
  const [pendingUpdate, setPendingUpdate] = useState<Update | undefined>()
  const confirmModalControls = useDisclosure()

  const handleDelete = (id: number) => {
    store.dispatch(actions.tipoProcedimento.delete(id))
  }

  const handleUpdate = () => {
    if (pendingUpdate) {
      store.dispatch(
        actions.tipoProcedimento.update({
          id: pendingUpdate.id,
          data: pendingUpdate.data
        })
      )
    }
    confirmModalControls.onClose()
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
              onClick={() => {
                setPendingUpdate({ id: tipo.id, data: { status: nextStatus } })
                confirmModalControls.onOpen()
              }}
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
    <>
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
      {
        <ConfirmModal
          {...confirmModalControls}
          onConfirm={handleUpdate}
          title="Alterar Status"
          content={`Tem certeza que deseja alterar os status do tipo de procedimento? Ele ficará ${pendingUpdate?.data.status?.toUpperCase()} para os usuários`}
        />
      }
    </>
  )
}

export default Table
