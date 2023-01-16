import { Box, Flex, Icon, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { AiFillDelete } from 'react-icons/ai'
import { ResponsiveContainer } from 'recharts'
import { actions, store } from 'store'
import { DataFetched, GraphType } from 'store/ducks/analise-dados'
import BarChart from './barchart'
import EditGraph from './edit-graph'
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

  return (
    <Flex flexDir="column" alignItems="center">
      <Flex justifyContent="space-between" w="100%" mb="1rem">
        <Box>
          <Text fontSize="sm" fontWeight="bold" noOfLines={1} isTruncated>
            Tipo Procedimento:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.tipoProcedimentoNome}
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight="bold" noOfLines={1} isTruncated>
            Formulário:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.formularioNome}
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight="bold" noOfLines={1} isTruncated>
            Campo:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.campo}
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Total:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.values.length}
            </Text>
          </Text>
        </Box>
        <Flex>
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
      </Flex>
      <ResponsiveContainer width={400} height={300}>
        {charts[data.type]}
      </ResponsiveContainer>
    </Flex>
  )
}
