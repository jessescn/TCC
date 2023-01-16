import { TipoProcedimento } from 'domain/entity/tipo-procedimento'
import {
  CartesianGrid,
  Legend,
  Pie,
  PieChart as RechartPie,
  Tooltip
} from 'recharts'
import { DataFetched } from 'store/ducks/analise-dados'

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
  const { parsedData, bars } = TipoProcedimento.convertFetchDataIntoGraphData(
    data.values
  )

  function getInnerRadius(i: number) {
    if (i == 0) return 0

    return 40 + 10 * i
  }

  return (
    <RechartPie width={width} height={height}>
      {bars.map((bar, i) => (
        <Pie
          data={parsedData}
          dataKey={bar}
          nameKey={bar}
          cx="50%"
          cy="50%"
          innerRadius={getInnerRadius(i)}
          outerRadius={50 + 10 * i + 20}
          fill={colors[i]}
          label
        />
      ))}
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
    </RechartPie>
  )
}
