import { TipoProcedimento } from 'domain/entity/tipo-procedimento'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
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

export default function Barchart({ data, height, width }: Props) {
  const { parsedData, bars } = TipoProcedimento.convertFetchDataIntoGraphData(
    data.values
  )

  return (
    <BarChart
      width={width}
      height={height}
      data={parsedData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {bars.map((bar, i) => (
        <Bar dataKey={bar} fill={colors[i]} />
      ))}
    </BarChart>
  )
}
