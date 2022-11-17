import Screen from 'components/atoms/screen'
import { Content } from 'components/pages/login/content'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function Login() {
  useEffect(() => {
    store.dispatch(actions.user.resetState())
  }, [])

  return (
    <Screen noHeader alignItems="center">
      <Content />
    </Screen>
  )
}
