import { Box, Divider, Text } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import { Title } from 'components/atoms/title'
import { LoadingPage } from 'components/molecules/loading'
import { selectors, useSelector } from 'store'
import Filtros from './filtros'
import TodosProcedimentosTable from './table'

export default function TodosProcedimentosList() {
  const isLoading = useSelector(selectors.procedimento.isLoadingContent)

  return (
    <Container>
      <Box>
        <Title>Procedimentos</Title>
        <Text my="1rem" fontSize="sm">
          Acompanhe todos os procedimentos do sistema. Para mais detalhes,
          clique em um dos elementos listados.
        </Text>
      </Box>
      <Divider my="1.5rem" borderColor="secondary.dark" />
      <Text mb="0.5rem" fontSize="lg" fontWeight="bold">
        Filtros
      </Text>
      <Filtros />
      {isLoading ? <LoadingPage default /> : <TodosProcedimentosTable />}
    </Container>
  )
}
