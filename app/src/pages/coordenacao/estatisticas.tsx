import { Box, Divider, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import EstatisticasProcedimento from 'components/pages/coordenacao/estatisticas'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function EstatisticasProcedimentoPage() {
  useEffect(() => {
    store.dispatch(
      actions.tipoProcedimento.list({ page: 1, per_page: 1000, term: null })
    )
    store.dispatch(actions.analiseDados.resetState())
  }, [])

  return (
    <Screen py="24px">
      <Box
        w="100%"
        h="100%"
        maxW="1200px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <Box>
          <Text fontWeight="bold" fontSize="28px" color="primary.dark">
            Estatísticas
          </Text>
          <Text my="16px" fontSize="14px">
            Crie até 4 gráficos simultâneos com as respostas de tipo de
            procedimentos existentes.
          </Text>
          <Divider my="24px" borderColor="secondary.dark" />
        </Box>
        <Box>
          <EstatisticasProcedimento />
        </Box>
      </Box>
    </Screen>
  )
}
