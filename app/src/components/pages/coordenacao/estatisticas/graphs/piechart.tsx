import { TipoProcedimento } from 'domain/entity/tipo-procedimento'
import {
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartPie,
  Tooltip
} from 'recharts'
import { DataFetched } from 'store/ducks/analise-dados'
import { Box, Text } from '@chakra-ui/react'
import Carousel from 'components/organisms/carousel'

const colors = [
  '#e60049',
  '#0bb4ff',
  '#50e991',
  '#e6d800',
  '#9b19f5',
  '#ffa300',
  '#dc0ab4',
  '#b3d4ff',
  '#00bfa0'
]

type Props = {
  data: DataFetched
  height: number
  width: number
}

export default function PieChart({ data, width, height }: Props) {
  const { parsedData } = TipoProcedimento.convertFetchDataIntoGraphData(
    data.values
  )

  function convertToPieChart(value: any) {
    const elements = Object.keys(value)

    return elements
      .filter(e => e !== 'name')
      .map(element => ({ name: element, value: value[element] }))
  }

  return (
    <Carousel>
      {parsedData.map((value, index) => (
        <Box key={`pie-${index}`}>
          <Text fontWeight="bold">{value.name}</Text>
          <RechartPie width={width} height={height}>
            <Pie
              data={convertToPieChart(value)}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {convertToPieChart(value).map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </RechartPie>
        </Box>
      ))}
    </Carousel>
  )
}
