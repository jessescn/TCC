import { Box, Center, Icon, Text } from '@chakra-ui/react'
import SimpleTable from 'components/organisms/simple-table'
import { MdSearchOff } from 'react-icons/md'
import { format } from 'date-fns'
import { actions, selectors, store, useSelector } from 'store'
import { EditMenu } from './menu'

const Table = () => {
  const pagination = useSelector(selectors.user.getPagination)
  const total = useSelector(selectors.user.getTotal)
  const usuarios = useSelector(selectors.user.getUsuarios)

  const handleUpdateCurrentPage = (nextPage: number) => {
    store.dispatch(actions.user.list({ ...pagination, page: nextPage }))
  }

  return usuarios.length > 0 ? (
    <>
      <Box
        mt="24px"
        borderColor="secondary.dark"
        borderWidth="1px"
        borderRadius="8px"
        p="16px"
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
            { content: 'Publicos', props: { width: '15%' } },
            { content: 'Atualizado em', props: { width: '10%' } },
            { content: '', props: { width: '5%' } }
          ]}
          rows={usuarios.map(usuario => [
            { content: usuario.id },
            { content: usuario.nome },
            { content: usuario.email },
            { content: usuario.profile.nome },
            { content: `[${usuario.publico}]` },
            {
              content: !usuario.updatedAt
                ? '-'
                : format(new Date(usuario.updatedAt), 'dd/MM/yyyy')
            },
            { content: <EditMenu usuario={usuario} /> }
          ])}
        />
      </Box>
    </>
  ) : (
    <Center flexDir="column" h="40vh">
      <Icon fontSize="45px" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="14px">
        Nenhum usuário encontrado.
      </Text>
    </Center>
  )
}

export default Table
