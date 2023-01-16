import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useSelector } from 'store'
import GraphSlot from './graph-slot'
import Graph from './graphs'

export default function EstatisticasProcedimento() {
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
