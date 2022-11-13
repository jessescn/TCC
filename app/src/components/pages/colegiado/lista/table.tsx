import { Box, Center, Icon, Text } from '@chakra-ui/react'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { MdSearchOff } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'

const Table = () => {
  const navigate = useNavigate()

  const procedimentos = useSelector(selectors.colegiado.getProcedimentos)
  const pagination = useSelector(selectors.colegiado.getPagination)
  const total = useSelector(state => state.colegiado.total)

  const handleRedirect = (element: Cell[]) => {
    const id = Number(element[0].content)

    navigate(`/colegiado/procedimentos/${id}`)
  }

  const handleUpdateCurrentPage = (nextPage: number) => {
    store.dispatch(actions.colegiado.list({ ...pagination, page: nextPage }))
  }

  return procedimentos.length > 0 ? (
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
        onClickRow={handleRedirect}
        columns={[
          { content: 'ID', props: { width: '10%' } },
          { content: 'Nome', props: { width: '45%' } },
          { content: 'Autor', props: { width: '15%' } },
          { content: 'Atualizado em', props: { width: '15%' } },
          { content: 'Criado em', props: { width: '15%' } }
        ]}
        rows={procedimentos.map(procedimento => [
          { content: procedimento.id },
          { content: procedimento.tipo_procedimento?.nome },
          { content: procedimento.actor?.nome || '-' },
          {
            content: !procedimento.updatedAt
              ? '-'
              : formatDate(procedimento.updatedAt)
          },
          {
            content: !procedimento.createdAt
              ? '-'
              : formatDate(procedimento.createdAt)
          }
        ])}
      />
    </Box>
  ) : (
    <Center flexDir="column" h="40vh">
      <Icon fontSize="45px" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="14px">
        Nenhum procedimento encontrado.
      </Text>
    </Center>
  )
}

export default Table
