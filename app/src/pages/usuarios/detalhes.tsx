import Screen from 'components/atoms/screen'

import Content from 'components/pages/usuarios/detalhes'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, store } from 'store'

export default function DetalhesUsuario() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    if (id) {
      store.dispatch(actions.userDetalhes.getInfo(Number(id)))
    }
  }, [])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
