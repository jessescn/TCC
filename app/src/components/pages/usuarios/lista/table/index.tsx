import { Box, Center, Icon, Text } from '@chakra-ui/react'
import SimpleTable from 'components/organisms/simple-table'
import { MdSearchOff } from 'react-icons/md'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'
import EditMenu from './edit-menu'

export default function UsuariosTable() {
  const pagination = useSelector(selectors.user.getPagination)
  const total = useSelector(selectors.user.getTotal)
  const usuarios = useSelector(selectors.user.getUsuarios)

  const handleUpdateCurrentPage = (nextPage: number) => {
    store.dispatch(actions.user.list({ ...pagination, page: nextPage }))
  }

  return usuarios.length > 0 ? (
    <>
      <Box
        mt="1.5rem"
        borderColor="secondary.dark"
        borderWidth="1px"
        borderRadius="lg"
        p="1rem"
      >
        <SimpleTable
          currentPage={pagination.page}
          totalPages={Math.ceil(total / pagination.per_page)}
          onChangePage={handleUpdateCurrentPage}
          columns={[
            { content: 'ID', props: { width: '5%' } },
            { content: 'Nome', props: { width: '40%' } },
            { content: 'Email', props: { width: '20%' } },
            { content: 'Profile', props: { width: '10%' } },
            { content: 'Publicos', props: { width: '5%' } },
            { content: 'Última Atualização', props: { width: '20%' } },
            { content: '', props: { width: '5%' } }
          ]}
          rows={usuarios.map(usuario => [
            { content: usuario.id },
            { content: usuario.nome },
            { content: usuario.email },
            { content: usuario.profile.nome },
            { content: usuario.publico.length },
            {
              content: !usuario.updatedAt ? '-' : formatDate(usuario.updatedAt)
            },
            { content: <EditMenu usuario={usuario} /> }
          ])}
        />
      </Box>
    </>
  ) : (
    <Center flexDir="column" h="40vh">
      <Icon fontSize="6xl" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="sm">
        Nenhum usuário encontrado.
      </Text>
    </Center>
  )
}
