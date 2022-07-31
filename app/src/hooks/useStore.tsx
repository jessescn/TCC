import { useEffect } from 'react'
import { actions, store } from 'store'

type Entitie = 'tipoProcesso' | 'form' | 'processo'

export const useStore = (entities: Entitie[]) => {
  useEffect(() => {
    entities.forEach(entity => {
      store.dispatch(actions[entity].list())
    })
  }, [])
}
