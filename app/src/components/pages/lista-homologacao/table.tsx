import { Box } from '@chakra-ui/react'
import SimpleTable, { Cell } from 'components/organisms/simple-table'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { useNavigate } from 'react-router-dom'
import { formatDate } from 'utils/format'

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

    navigate(`/colegiado/procedimentos/${id}`)
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
          { content: 'Nome', props: { width: '45%' } },
          { content: 'Autor', props: { width: '15%' } },
          { content: 'Atualizado em', props: { width: '15%' } },
          { content: 'Criado em', props: { width: '15%' } }
        ]}
        rows={sorted.map(procedimento => [
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
  )
}

export default Table
