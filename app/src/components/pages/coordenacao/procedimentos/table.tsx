import { Box, Center, Icon, Text } from '@chakra-ui/react'
import { LoadingPage } from 'components/molecules/loading'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { statusList } from 'domain/models/procedimento'
import { MdSearchOff } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'
import { getCurrentStatus } from 'utils/procedimento'

const Table = () => {
  const navigate = useNavigate()

  const pagination = useSelector(selectors.procedimento.getPagination)
  const status = useSelector(state => state.procedimento.status)
  const total = useSelector(state => state.procedimento.total)
  const procedimentos = useSelector(selectors.procedimento.getProcedimentos)

  const handleRedirect = (element: Cell[]) => {
    const id = Number(element[0].content)
    store.dispatch(actions.procedimento.resetStatus())

    navigate(`/coordenacao/procedimentos/${id}`)
  }

  const handleUpdateCurrentPage = (nextPage: number) => {
    store.dispatch(actions.procedimento.list({ ...pagination, page: nextPage }))
  }

  if (status === 'loading') {
    return <LoadingPage />
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
          { content: 'Nome', props: { width: '40%' } },
          { content: 'Autor', props: { width: '10%' } },
          { content: 'Status', props: { width: '10%' } },
          { content: 'Formulários', props: { width: '10%' } },
          { content: 'Última atualizacão', props: { width: '15%' } },
          { content: 'Criado em', props: { width: '15%' } }
        ]}
        rows={procedimentos.map(procedimento => {
          const status = getCurrentStatus(procedimento)

          return [
            { content: procedimento.id },
            { content: procedimento.tipo_procedimento?.nome },
            { content: procedimento.actor?.nome || '-' },
            { content: status ? statusList[status].label : '-' },
            {
              content: procedimento.tipo_procedimento?.formularios.length || 0
            },
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
          ]
        })}
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
