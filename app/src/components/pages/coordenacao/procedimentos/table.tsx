import { Box, Center, Icon, Text } from '@chakra-ui/react'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { statusList } from 'domain/models/procedimento'
import { MdSearchOff } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'
import { getCurrentStatus } from 'utils/procedimento'

export default function TodosProcedimentosTable() {
  const navigate = useNavigate()

  const pagination = useSelector(selectors.procedimento.getPagination)
  const procedimentos = useSelector(selectors.procedimento.getProcedimentos)
  const total = useSelector(state => state.procedimento.total)

  const handleRedirect = (element: Cell[]) => {
    const id = Number(element[0].content)

    store.dispatch(actions.procedimento.resetStatus())
    navigate(`/coordenacao/procedimentos/${id}`)
  }

  const handleUpdateCurrentPage = (nextPage: number) => {
    store.dispatch(actions.procedimento.list({ ...pagination, page: nextPage }))
  }

  return procedimentos.length > 0 ? (
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
        onClickRow={handleRedirect}
        columns={[
          { content: 'ID', props: { width: '10%' } },
          { content: 'Nome', props: { width: '35%' } },
          { content: 'Autor', props: { width: '15%' } },
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
      <Icon fontSize="6xl" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="sm">
        Nenhum procedimento encontrado.
      </Text>
    </Center>
  )
}
