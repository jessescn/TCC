import { Box, Select, Text } from '@chakra-ui/react'
import Graphs from './graphs'

export default function Content() {
  return (
    <Box>
      <Text fontSize="14px">Selecione o procedimento:</Text>
      <Select size="xs" maxW="500px" mt="8px">
        <option>Homologação de banca examinadora</option>
      </Select>
      <Box>
        <Graphs />
      </Box>
    </Box>
  )
}
