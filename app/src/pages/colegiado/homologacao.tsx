import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'
import Content from 'components/pages/colegiado/homologacao/content'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

const HomologarProcedimento = () => {
  const { id } = useParams()
  const isLoading = useSelector(selectors.procedimentoDetalhes.isLoadingContent)

  useEffect(() => {
    store.dispatch(actions.procedimentoDetalhes.getInfo(Number(id)))
  }, [])

  return (
    <Screen py="24px" h="auto" alignItems={isLoading ? 'center' : 'flex-start'}>
      {isLoading ? <LoadingPage /> : <Content />}
    </Screen>
  )
}

export default HomologarProcedimento
