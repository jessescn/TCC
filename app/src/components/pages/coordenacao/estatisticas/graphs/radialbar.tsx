import { TipoProcedimento } from 'domain/entity/tipo-procedimento'
import {
  Legend,
  RadialBar as RechartRadialBar,
  RadialBarChart,
  Tooltip
} from 'recharts'
import { DataFetched } from 'store/ducks/analise-dados'
import { Box, Text } from '@chakra-ui/react'
import Carousel from 'components/organisms/carousel'
import { useMemo } from 'react'

type Props = {
  data: DataFetched
  height: number
  width: number
}

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

export default function RadialBar({ data, width, height }: Props) {
  const { parsedData, bars } = TipoProcedimento.convertFetchDataIntoGraphData(
    data.values
  )
  const fillWithColors = useMemo(
    () =>
      parsedData.map((value, i) => ({
        ...value,
        fill: colors[i % colors.length]
      })),
    [parsedData]
  )

  return (
    <Carousel>
      {bars.map((bar, i) => (
        <Box key={`radial-${i}`}>
          <Text fontWeight="bold">{bar}</Text>
          <RadialBarChart
            width={width}
            height={height}
            innerRadius="20%"
            outerRadius="100%"
            data={fillWithColors}
            startAngle={180}
            endAngle={0}
          >
            <RechartRadialBar
              fill={colors[i]}
              label={{ fill: '#666', position: 'insideStart' }}
              background
              dataKey={bar}
            />
            <Legend
              iconSize={8}
              width={80}
              height={140}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={{ fontSize: '12px' }}
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        </Box>
      ))}
    </Carousel>
  )
}
