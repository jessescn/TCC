import {
  Box,
  Center,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import ConfirmModal from 'components/organisms/confirm-modal'
import SimpleTable from 'components/organisms/simple-table'
import { FormularioModel } from 'domain/models/formulario'
import { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { MdSearchOff } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'

export default function FormulariosTable() {
  const navigate = useNavigate()
  const confirmModalControls = useDisclosure()

  const formularios = useSelector(selectors.formulario.getFormularios)
  const pagination = useSelector(state => state.formulario.pagination)
  const total = useSelector(state => state.formulario.total)

  const [pendingDeleted, setPendingDeleted] = useState<number | null>()

  const totalPages = Math.ceil(total / pagination.per_page)

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

  const handleUpdatePage = (newPage: number) => {
    store.dispatch(actions.formulario.list({ ...pagination, page: newPage }))
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

  return formularios.length > 0 ? (
    <Box
      mt="24px"
      borderColor="secondary.dark"
      borderWidth="1px"
      borderRadius="8px"
      p="16px"
    >
      <SimpleTable
        currentPage={pagination.page}
        onChangePage={handleUpdatePage}
        totalPages={totalPages}
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
        onConfirmButtonText="Excluir"
        onConfirmButtonStyle={{ backgroundColor: 'info.error' }}
      />
    </Box>
  ) : (
    <Center flexDir="column" h="40vh">
      <Icon fontSize="45px" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="14px">
        Nenhum formulário encontrado. Clique em 'Novo Formulário' para construir
        um novo modelo
      </Text>
    </Center>
  )
}
