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
import { UserModel } from 'domain/models/user'
import { AiFillEdit } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store } from 'store'

type Props = {
  usuario: UserModel
}

export const EditMenu = ({ usuario }: Props) => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectors.session.getCurrentUser)

  const confirmDeleteControls = useDisclosure()

  const handleDelete = () => {
    if (currentUser?.id !== usuario.id) {
      store.dispatch(actions.user.delete(usuario.id))
    }
    confirmDeleteControls.onClose()
  }

  const cannotBeDeleted = usuario.deleted || currentUser?.id === usuario.id

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
            onClick={() =>
              navigate(`/coordenacao/usuarios/edit?id=${usuario.id}`)
            }
          >
            Visualizar
          </MenuItem>
          <MenuItem
            isDisabled={cannotBeDeleted}
            onClick={() => {
              confirmDeleteControls.onOpen()
            }}
          >
            Excluir
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmModal
        {...confirmDeleteControls}
        onConfirm={handleDelete}
        title="Confirmar Deleção"
        content={`Tem certeza que deseja excluir esse usuário?`}
      />
    </>
  )
}
