import { Flex, Spinner } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Content from 'components/pages/novo-procedimento/content'
import Header from 'components/pages/novo-procedimento/header'
import { useParams } from 'react-router-dom'
import { selectors, useSelector } from 'store'

export default function NovoProcedimento() {
  const { id } = useParams()

  const tipoProcedimento = useSelector(state =>
    selectors.tipoProcedimento.getTipoProcedimento(state)(Number(id))
  )
  const formularios = useSelector(state =>
    selectors.formulario.getFormulariosByProcedimento(state)(tipoProcedimento)
  )

  return (
    <Screen py="24px" h="100%">
      {!tipoProcedimento ? (
        <Spinner />
      ) : (
        <Flex w="100%" h="100%" maxW="900px" flexDir="column">
          <Header tipoProcedimento={tipoProcedimento} />
          <Content
            formularios={formularios}
            tipoProcedimento={tipoProcedimento}
          />
        </Flex>
      )}
    </Screen>
  )
}
