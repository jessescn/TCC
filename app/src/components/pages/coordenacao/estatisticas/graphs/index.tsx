import { Box, Flex, Icon, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { AiFillDelete } from 'react-icons/ai'
import { ResponsiveContainer } from 'recharts'
import { actions, store } from 'store'
import { DataFetched } from 'store/ducks/analise-dados'
import Barchart from './barchart'

type Props = {
  type: string
  index: number
  data: DataFetched
}

export default function Graph({ index, data }: Props) {
  function handleDelete() {
    store.dispatch(actions.analiseDados.deleteData(index))
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box>
          <Text fontSize="sm" fontWeight="bold">
            Tipo Procedimento:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.tipoProcedimentoNome}
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Formulário:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.formularioNome}
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Campo:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.campo}
            </Text>
          </Text>
          <Text fontSize="sm" fontWeight="bold">
            Total Respostas:
            <Text ml="4px" as="span" fontWeight="normal">
              {data.values.length}
            </Text>
          </Text>
        </Box>
        <Tooltip label="Remover Gráfico">
          <IconButton
            size="sm"
            onClick={handleDelete}
            _hover={{ bgColor: 'info.errorDark' }}
            bgColor="info.error"
            color="initial.white"
            aria-label="remove grafico"
            icon={<Icon as={AiFillDelete} />}
          />
        </Tooltip>
      </Flex>
      <ResponsiveContainer width={400} height={300}>
        <Barchart width={400} height={300} data={data} />
      </ResponsiveContainer>
    </Box>
  )
}
