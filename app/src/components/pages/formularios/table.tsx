import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import SimpleTable from 'components/organisms/simple-table'
import { FormularioModel } from 'domain/models/formulario'
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
  const navigate = useNavigate()

  const totalPages = Math.ceil(formularios.length / 5)

  const handleDelete = (id: number) => {
    store.dispatch(actions.formulario.delete(id))
  }

  const handleRedirect = (formularioId: number) => {
    store.dispatch(actions.formulario.resetStatus())
    navigate(`/formularios/edit?id=${formularioId}`)
  }

  const getEditMenu = (form: FormularioModel) => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          variant="unstyled"
          size="sm"
          icon={<Icon as={AiFillEdit} />}
        />
        <MenuList>
          <MenuItem onClick={() => handleRedirect(form.id)}>Editar</MenuItem>
          <MenuItem onClick={() => handleDelete(form.id)}>Excluir</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return (
    <SimpleTable
      currentPage={currentPage}
      totalPages={totalPages}
      onChangePage={setCurrentPage}
      columns={[
        { content: 'ID', props: { width: '10%' } },
        { content: 'Nome', props: { width: '60%' } },
        { content: 'Criado por', props: { width: '15%' } },
        { content: 'Última atualizacão', props: { width: '10%' } },
        { content: '', props: { width: '5%' } }
      ]}
      rows={formularios.map(form => [
        { content: form.id },
        { content: form.nome },
        { content: form.actor?.nome || '-' },
        {
          content: !form.updatedAt ? '-' : formatDate(form.updatedAt)
        },
        { content: getEditMenu(form) }
      ])}
    />
  )
}
