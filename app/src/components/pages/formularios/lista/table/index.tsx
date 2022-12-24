import { Box, Center, Icon, Text, useDisclosure } from '@chakra-ui/react'
import ConfirmModal from 'components/organisms/confirm-modal'
import SimpleTable from 'components/organisms/simple-table'
import { useState } from 'react'
import { MdSearchOff } from 'react-icons/md'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'
import EditMenu from './edit-menu'

export default function FormulariosTable() {
  const confirmModalControls = useDisclosure()

  const formularios = useSelector(selectors.formulario.getFormularios)
  const pagination = useSelector(selectors.formulario.getPagination)
  const total = useSelector(state => state.formulario.total)

  const [pendingDeleted, setPendingDeleted] = useState<number | null>()

  const totalPages = Math.ceil(total / pagination.per_page)

  const handleConfirmDeletion = () => {
    if (pendingDeleted) {
      store.dispatch(actions.formulario.delete(pendingDeleted))
    }
    confirmModalControls.onClose()
  }

  const handleOpenConfirmModal = (id: number) => {
    setPendingDeleted(id)
    confirmModalControls.onOpen()
  }

  const handleUpdatePage = (newPage: number) => {
    store.dispatch(actions.formulario.list({ ...pagination, page: newPage }))
  }

  return formularios.length > 0 ? (
    <Box
      mt="1.5rem"
      borderColor="secondary.dark"
      borderWidth="1px"
      borderRadius="lg"
      p="1rem"
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
          {
            content: (
              <EditMenu formulario={form} onConfirm={handleOpenConfirmModal} />
            )
          }
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
      <Icon fontSize="6xl" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="sm">
        Nenhum formulário encontrado. Clique em 'Novo Formulário' para construir
        um novo modelo
      </Text>
    </Center>
  )
}
