import { Box } from '@chakra-ui/react'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { ProcedimentoModel, statusList } from 'domain/models/procedimento'
import { useNavigate } from 'react-router-dom'
import { actions, store } from 'store'
import { formatDate } from 'utils/format'
import { getCurrentStatus } from 'utils/procedimento'

type Props = {
  procedimentos: ProcedimentoModel[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Table = ({ procedimentos, currentPage, setCurrentPage }: Props) => {
  const navigate = useNavigate()

  const sorted = [...procedimentos]

  sorted.sort(function (a, b) {
    return a.id - b.id
  })

  const handleRedirect = (element: Cell[]) => {
    const id = Number(element[0].content)
    store.dispatch(actions.procedimento.resetStatus())

    navigate(`/coordenacao/procedimentos/${id}`)
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
        rows={sorted.map(procedimento => {
          const status = getCurrentStatus(procedimento)

          return [
            { content: procedimento.id },
            { content: procedimento.tipo_procedimento?.nome },
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
  )
}

export default Table
