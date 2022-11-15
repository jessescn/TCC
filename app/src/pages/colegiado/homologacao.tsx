import Screen from 'components/atoms/screen'
import Content from 'components/pages/colegiado/homologacao/content'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, store } from 'store'

const HomologarProcedimento = () => {
  const { id } = useParams()

  useEffect(() => {
    store.dispatch(actions.procedimentoDetalhes.getInfo(Number(id)))
  }, [])

  return (
    <Screen py="24px" h="auto">
      <Content />
    </Screen>
  )
}

export default HomologarProcedimento
