import { Flex, Spinner } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Content from 'components/pages/novo-processo/content'
import Header from 'components/pages/novo-processo/header'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function NovoProcesso() {
  const { id } = useParams()

  const tipoProcesso = useSelector(state =>
    selectors.tipoProcesso.getTipoProcesso(state)(Number(id))
  )
  const formularios = useSelector(state =>
    selectors.form.getFormulariosByTipoProcesso(state)(tipoProcesso)
  )

  useEffect(() => {
    store.dispatch(actions.tipoProcesso.list())
    store.dispatch(actions.form.list())
  }, [])

  return (
    <Screen py="24px" h="100%">
      {!tipoProcesso ? (
        <Spinner />
      ) : (
        <Flex w="100%" h="100%" maxW="900px" flexDir="column">
          <Header tipoProcesso={tipoProcesso} />
          <Content formularios={formularios} tipoProcesso={tipoProcesso} />
        </Flex>
      )}
    </Screen>
  )
}
