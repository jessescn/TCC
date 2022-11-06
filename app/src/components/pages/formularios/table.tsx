import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure
} from '@chakra-ui/react'
import ConfirmModal from 'components/organisms/confirm-modal'
import SimpleTable from 'components/organisms/simple-table'
import { FormularioModel } from 'domain/models/formulario'
import { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'
import { formatDate } from 'utils/format'

type Props = {
  formularios: FormularioModel[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function FormulariosTable({
  formularios,
  currentPage,
  setCurrentPage
}: Props) {
  const [pendingDeleted, setPendingDeleted] = useState<number | null>()
  const navigate = useNavigate()
  const confirmModalControls = useDisclosure()

  const totalPages = Math.ceil(formularios.length / 5)

  const handleConfirmDeletion = () => {
    if (pendingDeleted) {
      store.dispatch(actions.formulario.delete(pendingDeleted))
    }
    confirmModalControls.onClose()
  }

  const handleRedirect = (formularioId: number) => {
    store.dispatch(actions.formulario.resetStatus())
    navigate(`/formularios/edit?id=${formularioId}`)
  }

  const handleOpenConfirmModal = (id: number) => {
    setPendingDeleted(id)
    confirmModalControls.onOpen()
  }

  const getEditMenu = (form: FormularioModel) => {
    return (
      <Menu>
        <MenuButton
          disabled={form.deleted}
          as={IconButton}
          variant="unstyled"
          size="sm"
          icon={<Icon as={AiFillEdit} />}
        />
        <MenuList>
          <MenuItem onClick={() => handleRedirect(form.id)}>Editar</MenuItem>
          <MenuItem onClick={() => handleOpenConfirmModal(form.id)}>
            Excluir
          </MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return (
    <>
      <SimpleTable
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
        columns={[
          { content: 'ID', props: { width: '10%' } },
          { content: 'Nome', props: { width: '55%' } },
          { content: 'Deletado', props: { width: '10%' } },
          { content: 'Criado por', props: { width: '10%' } },
          { content: 'Última atualizacão', props: { width: '10%' } },
          { content: '', props: { width: '5%' } }
        ]}
        rows={formularios.map(form => [
          { content: form.id },
          { content: form.nome },
          { content: form.deleted ? 'Sim' : 'Não' },
          { content: form.actor?.nome || '-' },
          {
            content: !form.updatedAt ? '-' : formatDate(form.updatedAt)
          },
          { content: getEditMenu(form) }
        ])}
      />
      <ConfirmModal
        title="Remover formulário"
        content="Tem certeza que quer excluir o formulário? todos os tipos de procedimentos relacionados serão inativados."
        {...confirmModalControls}
        onConfirm={handleConfirmDeletion}
      />
    </>
  )
}
