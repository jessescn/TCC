import { Box, Flex, Spinner } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Content from 'components/pages/detalhes-procedimento/content'
import { useParams } from 'react-router-dom'
import { selectors, useSelector } from 'store'

const DetalhesProcedimento = () => {
  const { id } = useParams()

  const procedimento = useSelector(state =>
    selectors.procedimento.getProcedimentoById(state)(Number(id))
  )

  const formularios = useSelector(state =>
    selectors.formulario.getFormulariosByProcedimento(state)(procedimento)
  )

  return (
    <Screen py="24px" h="calc(100vh - 72px)">
      {!procedimento ? (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Box
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
            w="100%"
            h="100%"
            maxW="1200px"
            bgColor="initial.white"
            borderRadius="8px"
            px="24px"
            py="32px"
            position="relative"
          >
            <Content procedimento={procedimento} formularios={formularios} />
          </Box>
        </>
      )}
    </Screen>
  )
}

export default DetalhesProcedimento
