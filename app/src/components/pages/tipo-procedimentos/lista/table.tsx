import { Box, Center, Icon, Text } from '@chakra-ui/react'
import SimpleTable from 'components/organisms/simple-table'
import { format } from 'date-fns'
import { MdSearchOff } from 'react-icons/md'
import { actions, selectors, store, useSelector } from 'store'
import { EditMenu } from './menu'

const Table = () => {
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
  ) : (
    <Center flexDir="column" h="40vh">
      <Icon fontSize="45px" as={MdSearchOff} />
      <Text textAlign="center" maxW="300px" fontSize="14px">
        Nenhum formulário encontrado. Clique em 'Novo Formulário' para construir
        um novo modelo
      </Text>
    </Center>
  )
}

export default Table
