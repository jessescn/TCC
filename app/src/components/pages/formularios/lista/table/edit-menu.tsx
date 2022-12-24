import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { FormularioModel } from 'domain/models/formulario'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'

type Props = {
  formulario: FormularioModel
  onConfirm: (id: number) => void
}

export default function EditMenu({ formulario, onConfirm }: Props) {
  const navigate = useNavigate()

  const handleRedirect = (formularioId: number) => {
    store.dispatch(actions.formulario.resetStatus())
    navigate(`/formularios/edit?id=${formularioId}`)
  }

  return (
    <Menu>
      <MenuButton
        disabled={formulario.deleted}
        as={IconButton}
        variant="unstyled"
        size="sm"
        icon={<Icon as={AiFillEdit} />}
      />
      <MenuList>
        <MenuItem onClick={() => handleRedirect(formulario.id)}>
          Editar
        </MenuItem>
        <MenuItem onClick={() => onConfirm(formulario.id)}>Excluir</MenuItem>
      </MenuList>
    </Menu>
  )
}
