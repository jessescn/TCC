import { TipoProcedimento } from 'domain/entity/tipo-procedimento'
import {
  Legend,
  RadialBar as RechartRadialBar,
  RadialBarChart,
  Tooltip
} from 'recharts'
import { DataFetched } from 'store/ducks/analise-dados'

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

  return (
    <RadialBarChart
      width={width}
      height={height}
      innerRadius="20%"
      outerRadius="100%"
      data={parsedData}
      startAngle={180}
      endAngle={0}
    >
      {bars.map((bar, i) => (
        <RechartRadialBar
          fill={colors[i]}
          label={{ fill: '#666', position: 'insideStart' }}
          background
          dataKey={bar}
        />
      ))}
      <Legend
        iconSize={8}
        width={100}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={{ fontSize: '12px' }}
        align="right"
      />
      <Tooltip />
    </RadialBarChart>
  )
}
