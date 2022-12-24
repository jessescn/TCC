import { Box, Center, Icon, Text } from '@chakra-ui/react'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { MdSearchOff } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'

export default function ProcedimentosHomologacaoTable() {
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
          { content: 'Nome', props: { width: '40%' } },
          { content: 'Autor', props: { width: '15%' } },
          { content: 'Votos', props: { width: '5%' } },
          { content: 'Última Atualização', props: { width: '15%' } },
          { content: 'Criado em', props: { width: '15%' } }
        ]}
        rows={procedimentos.map(procedimento => [
          { content: procedimento.id },
          { content: procedimento.tipo_procedimento?.nome },
          { content: procedimento.actor?.nome || '-' },
          { content: procedimento.votos?.length || 0 },
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
      <Icon fontSize="6xl" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="sm">
        Nenhum tipo de procedimento encontrado.
      </Text>
    </Center>
  )
}
