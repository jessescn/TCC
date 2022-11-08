import { Box } from '@chakra-ui/react'
import SimpleTable from 'components/organisms/simple-table'
import { format } from 'date-fns'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { EditMenu } from './menu'

type Props = {
  tipoProcedimentos: TipoProcedimentoModel[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Table = ({ tipoProcedimentos, currentPage, setCurrentPage }: Props) => {
  return (
    <>
      <Box
        mt="24px"
        borderColor="secondary.dark"
        borderWidth="1px"
        borderRadius="8px"
        p="16px"
      >
        <SimpleTable
          currentPage={currentPage}
          totalPages={Math.ceil(tipoProcedimentos.length / 5)}
          onChangePage={setCurrentPage}
          columns={[
            { content: 'ID', props: { width: '5%' } },
            { content: 'Nome', props: { width: '40%' } },
            { content: 'Status', props: { width: '5%' } },
            { content: 'Colegiado', props: { width: '10%' } },
            { content: 'Prazo Início', props: { width: '10%' } },
            { content: 'Prazo Fim', props: { width: '10%' } },
            { content: 'Última atualizacão', props: { width: '10%' } },
            { content: '', props: { width: '5%' } }
          ]}
          rows={tipoProcedimentos.map(tipo => [
            { content: tipo.id },
            { content: tipo.nome },
            { content: tipo.status },
            { content: tipo.colegiado ? 'Sim' : 'Não' },
            {
              content: !tipo.dataInicio
                ? '-'
                : format(new Date(tipo.dataInicio), 'dd/MM/yyyy')
            },
            {
              content: !tipo.dataFim
                ? '-'
                : format(new Date(tipo.dataFim), 'dd/MM/yyyy')
            },
            {
              content: !tipo.updatedAt
                ? '-'
                : format(new Date(tipo.updatedAt), 'dd/MM/yyyy')
            },
            { content: <EditMenu tipo={tipo} /> }
          ])}
        />
      </Box>
    </>
  )
}

export default Table
