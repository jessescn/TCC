import Screen from 'components/atoms/screen'
import { Content } from 'components/pages/confirmacao-email-codigo'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, store } from 'store'

export default function ConfirmacaoEmailCodigo() {
  const { code } = useParams()

  useEffect(() => {
    if (code) {
      store.dispatch(actions.session.exchangeEmailConfirmationCode(code))
    }
  }, [])

  return (
    <Screen noHeader alignItems="center">
      <Content />
    </Screen>
  )
}
