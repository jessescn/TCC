import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure
} from '@chakra-ui/react'
import { AiFillEdit } from 'react-icons/ai'
import {
  TipoProcedimentoModel,
  TipoProcedimentoStatus
} from 'domain/models/tipo-procedimento'
import ConfirmModal from 'components/organisms/confirm-modal'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'
import { useState } from 'react'

type Props = {
  tipo: TipoProcedimentoModel
}

type Update = {
  id: number
  data: Partial<TipoProcedimentoModel>
}

export const EditMenu = ({ tipo }: Props) => {
  const navigate = useNavigate()
  const confirmUpdateControls = useDisclosure()
  const confirmDeleteControls = useDisclosure()

  const [pendingUpdate, setPendingUpdate] = useState<Update | undefined>()
  const [pendingDelete, setPendingDelete] = useState<number | undefined>()

  const status =
    tipo.status === 'ativo'
      ? { action: 'Inativar', next: 'inativo' }
      : { action: 'Ativar', next: 'ativo' }

  const handleDelete = () => {
    if (pendingDelete) {
      store.dispatch(actions.tipoProcedimento.delete(pendingDelete))
    }
    confirmDeleteControls.onClose()
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
    confirmUpdateControls.onClose()
  }

  return (
    <>
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
            {tipo.deleted ? 'Visualizar' : 'Editar'}
          </MenuItem>
          {tipo.status !== 'rascunho' && (
            <MenuItem
              isDisabled={tipo.deleted}
              onClick={() => {
                setPendingUpdate({
                  id: tipo.id,
                  data: { status: status.next as TipoProcedimentoStatus }
                })
                confirmUpdateControls.onOpen()
              }}
            >
              {status.action}
            </MenuItem>
          )}
          <MenuItem
            isDisabled={tipo.deleted}
            onClick={() => {
              setPendingDelete(tipo.id)
              confirmDeleteControls.onOpen()
            }}
          >
            Excluir
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmModal
        {...confirmUpdateControls}
        onConfirm={handleUpdate}
        title="Alterar Status"
        onConfirmButtonText="Confirmar"
        content={`Tem certeza que deseja alterar os status do tipo de procedimento?
        Ele ficará ${pendingUpdate?.data.status?.toUpperCase()} para os usuários`}
      />
      <ConfirmModal
        {...confirmDeleteControls}
        onConfirm={handleDelete}
        title="Confirmar Deleção"
        onConfirmButtonText="Confirmar"
        content={`Tem certeza que deseja excluir esse tipo de procedimento? ele ficará indisponível
        para os usuários`}
      />
    </>
  )
}
