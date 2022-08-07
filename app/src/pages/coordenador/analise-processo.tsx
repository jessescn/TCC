import { Box } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Content from 'components/pages/analisar-processo/content'
import { useParams } from 'react-router-dom'
import { selectors, useSelector } from 'store'

export default function AnaliseProcesso() {
  const { id } = useParams()

  const processo = useSelector(state =>
    selectors.processo.getProcessoById(state)(Number(id))
  )

  const formularios = useSelector(state =>
    selectors.form.getFormulariosByProcesso(state)(processo)
  )

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
        {processo && <Content formularios={formularios} processo={processo} />}
      </Box>
    </Screen>
  )
}
