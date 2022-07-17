import { Box } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Footer from 'components/pages/preencher-processo/footer'
import Header from 'components/pages/preencher-processo/header'
import RenderFormulario from 'components/pages/preencher-processo/render-formulario'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function PreencherProcesso() {
  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

  const tipoProcessos = useSelector(selectors.tipoProcesso.getTipoProcessos)
  const formularios = useSelector(selectors.form.getForms)

  useEffect(() => {
    store.dispatch(actions.tipoProcesso.list())
    store.dispatch(actions.form.list())
  }, [])

  return (
    <Screen py="24px">
      <Box w="100%" h="100%" boxSize="border-box" maxW="800px">
        {tipoProcessos.length > 0 && <Header tipoProcesso={tipoProcessos[0]} />}
        {formularios.length > 0 && (
          <RenderFormulario formulario={formularios[0]} />
        )}
        <Footer />
      </Box>
    </Screen>
  )
}
