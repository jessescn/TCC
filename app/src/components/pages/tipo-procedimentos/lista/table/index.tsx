import { Box, Center, Icon, Text } from '@chakra-ui/react'
import SimpleTable from 'components/organisms/simple-table'
import { MdSearchOff } from 'react-icons/md'
import { actions, selectors, store, useSelector } from 'store'
import { formatDate } from 'utils/format'
import EditMenu from './edit-menu'

export default function TipoProcedimentosTable() {
  const pagination = useSelector(selectors.tipoProcedimento.getPagination)
  const total = useSelector(state => state.tipoProcedimento.total)
  const tipoProcedimentos = useSelector(
    selectors.tipoProcedimento.getTipoProcedimentos
  )

  const handleUpdateCurrentPage = (nextPage: number) => {
    store.dispatch(
      actions.tipoProcedimento.list({ ...pagination, page: nextPage })
    )
  }

  return tipoProcedimentos.length > 0 ? (
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
            { content: 'Nome', props: { width: '30%' } },
            { content: 'Status', props: { width: '5%' } },
            { content: 'Análise Coordenação', props: { width: '10%' } },
            { content: 'Colegiado', props: { width: '10%' } },
            { content: 'Prazo Início', props: { width: '10%' } },
            { content: 'Prazo Fim', props: { width: '10%' } },
            { content: '', props: { width: '5%' } }
          ]}
          rows={tipoProcedimentos.map(tipo => [
            { content: tipo.id },
            { content: tipo.nome },
            { content: tipo.status },
            { content: tipo.revisao_coordenacao ? 'Sim' : 'Não' },
            { content: tipo.colegiado ? 'Sim' : 'Não' },
            {
              content: !tipo.dataInicio ? '-' : formatDate(tipo.dataInicio)
            },
            {
              content: !tipo.dataFim ? '-' : formatDate(tipo.dataFim)
            },
            { content: <EditMenu tipo={tipo} /> }
          ])}
        />
      </Box>
    </>
  ) : (
    <Center flexDir="column" h="40vh">
      <Icon fontSize="6xl" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="sm">
        Nenhum tipo de procedimento encontrado. Clique em 'Novo Tipo
        Procedimento' para criar um novo
      </Text>
    </Center>
  )
}
