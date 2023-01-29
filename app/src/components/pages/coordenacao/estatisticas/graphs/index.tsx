import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { AiFillDelete } from 'react-icons/ai'
import { ResponsiveContainer } from 'recharts'
import { actions, store } from 'store'
import { DataFetched, GraphType } from 'store/ducks/analise-dados'
import { formatDate } from 'utils/format'
import BarChart from './barchart'
import EditGraph from './edit-graph'
import FiltersGraph from './filters'
import PieChart from './piechart'
import RadialChart from './radialbar'

type Props = {
  type: string
  index: number
  data: DataFetched
}

export default function Graph({ index, data }: Props) {
  function handleDelete() {
    store.dispatch(actions.analiseDados.deleteData(index))
  }

  const charts: Record<GraphType, JSX.Element> = {
    pie: <PieChart width={400} height={300} data={data} />,
    radial: <RadialChart width={400} height={300} data={data} />,
    bar: <BarChart width={400} height={300} data={data} />
  }

  const hasSomeFilter = data.filtros?.dataFim || data.filtros?.dataInicio

  return (
    <Flex flexDir="column" alignItems="center" w="100%">
      <Flex justifyContent="space-between" w="100%" mb="1rem">
        <Stack spacing="0.5rem" fontSize="sm">
          <Box>
            <Text fontWeight="bold">Tipo Procedimento:</Text>
            <Text>{data.tipoProcedimentoNome}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Formulário:</Text>
            <Text>{data.formularioNome}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Campo:</Text>
            <Text>{data.campo}</Text>
          </Box>
          <Text fontWeight="bold">
            Total procedimentos:
            <Text ml="0.5rem" as="span" fontWeight="normal">
              {data.values.length}
            </Text>
          </Text>
          {hasSomeFilter && (
            <Box fontSize="sm" mt="0.75rem">
              <Text fontWeight="bold">Filtros:</Text>
              <Stack spacing="1rem" direction="row">
                <Text fontWeight="bold">
                  De:
                  <Text fontWeight="normal" as="span" ml="0.25rem">
                    {data.filtros?.dataInicio
                      ? formatDate(data.filtros?.dataInicio, {
                          customFormat: 'dd/MM/yyyy',
                          ignoreTimezone: true
                        })
                      : '-'}
                  </Text>
                </Text>
                <Text fontWeight="bold">
                  Até:
                  <Text fontWeight="normal" as="span" ml="0.25rem">
                    {data.filtros?.dataFim
                      ? formatDate(data.filtros?.dataFim, {
                          customFormat: 'dd/MM/yyyy',
                          ignoreTimezone: true
                        })
                      : '-'}
                  </Text>
                </Text>
              </Stack>
            </Box>
          )}
        </Stack>
        <Box>
          <Flex>
            <FiltersGraph data={data} />
            <EditGraph data={data} />
            <Tooltip label="Remover Gráfico">
              <IconButton
                size="sm"
                onClick={handleDelete}
                _hover={{ bgColor: 'info.error' }}
                bgColor="info.errorDark"
                color="initial.white"
                aria-label="remove grafico"
                icon={<Icon as={AiFillDelete} />}
              />
            </Tooltip>
          </Flex>
        </Box>
      </Flex>
      <ResponsiveContainer width={400} height={300}>
        {charts[data.type]}
      </ResponsiveContainer>
    </Flex>
  )
}
