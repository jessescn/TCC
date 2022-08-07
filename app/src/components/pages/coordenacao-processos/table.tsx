import { Box } from '@chakra-ui/react'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { ProcessoModel, statusList } from 'domain/models/processo'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'
import { formatDate } from 'utils/format'
import { getCurrentStatus } from 'utils/procedimento'

type Props = {
  processos: ProcessoModel[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Table = ({ processos, currentPage, setCurrentPage }: Props) => {
  const navigate = useNavigate()

  const sorted = [...processos]

  sorted.sort(function (a, b) {
    return a.id - b.id
  })

  const handleRedirect = (element: Cell[]) => {
    const id = Number(element[0].content)
    store.dispatch(actions.processo.resetStatus())

    navigate(`/coordenacao/processos/${id}`)
  }

  return (
    <Box
      mt="24px"
      borderColor="secondary.dark"
      borderWidth="1px"
      borderRadius="8px"
      p="16px"
    >
      <SimpleTable
        currentPage={currentPage}
        totalPages={Math.ceil(sorted.length / 5)}
        onChangePage={setCurrentPage}
        onClickRow={handleRedirect}
        columns={[
          { content: 'ID', props: { width: '10%' } },
          { content: 'Nome', props: { width: '40%' } },
          { content: 'Status', props: { width: '15%' } },
          { content: 'Formulários', props: { width: '15%' } },
          { content: 'Última atualizacão', props: { width: '15%' } },
          { content: 'Criado em', props: { width: '15%' } }
        ]}
        rows={sorted.map(processo => {
          const status = getCurrentStatus(processo)

          return [
            { content: processo.id },
            { content: processo.tipo_processo?.nome },
            { content: statusList[status].label },
            { content: processo.tipo_processo?.formularios.length || 0 },
            {
              content: !processo.updatedAt
                ? '-'
                : formatDate(processo.updatedAt)
            },
            {
              content: !processo.createdAt
                ? '-'
                : formatDate(processo.createdAt)
            }
          ]
        })}
      />
    </Box>
  )
}

export default Table
