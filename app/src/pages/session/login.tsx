import Screen from 'components/atoms/screen'
import Login from 'components/pages/login'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function LoginPage() {
  useEffect(() => {
    store.dispatch(actions.user.resetState())
  }, [])

  return (
    <Screen noHeader alignItems="center">
      <Login />
    </Screen>
  )
}
