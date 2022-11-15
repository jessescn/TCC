import Screen from 'components/atoms/screen'
import Content from 'components/pages/procedimentos/detalhes/content'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, store } from 'store'

const DetalhesProcedimento = () => {
  const { id } = useParams()

  useEffect(() => {
    console.log('entrou aqui', Number(id))

    store.dispatch(actions.procedimentoDetalhes.getInfo(Number(id)))
  }, [])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}

export default DetalhesProcedimento
