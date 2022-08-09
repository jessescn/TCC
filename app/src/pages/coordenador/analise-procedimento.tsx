import { Box } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Content from 'components/pages/analisar-procedimento/content'
import { useParams } from 'react-router-dom'
import { selectors, useSelector } from 'store'

export default function AnaliseProcedimento() {
  const { id } = useParams()

  const procedimento = useSelector(state =>
    selectors.procedimento.getProcedimentoById(state)(Number(id))
  )

  const formularios = useSelector(state =>
    selectors.formulario.getFormulariosByProcedimento(state)(procedimento)
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
        {procedimento && (
          <Content formularios={formularios} procedimento={procedimento} />
        )}
      </Box>
    </Screen>
  )
}
