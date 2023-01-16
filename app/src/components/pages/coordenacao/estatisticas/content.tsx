import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from 'recharts'
import { selectors, useSelector } from 'store'
import GraphSlot from './graph-slot'
import Graph from './graphs'
import Barchart from './graphs/barchart'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

export default function Content() {
  const tipoDatas = useSelector(state => state.analiseDados.dataInfo)

  return (
    <Box>
      <Grid gap={4} templateColumns="repeat(2, 1fr)" w="100%" mt="16px">
        {tipoDatas.map((data, i) => (
          <GridItem key={data.position} colSpan={1}>
            <Graph index={i} type="bar" data={data} />
          </GridItem>
        ))}
        {tipoDatas.length < 4 && (
          <GridItem colSpan={1} minW={300} minH={400}>
            <GraphSlot />
          </GridItem>
        )}
      </Grid>
    </Box>
  )
}
