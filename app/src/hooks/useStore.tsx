import { useEffect } from 'react'
import { actions, store } from 'store'

type Entity = 'tipoProcedimento' | 'form' | 'procedimento'

export const useStore = (entities: Entity[]) => {
  useEffect(() => {
    entities.forEach(entity => {
      store.dispatch(actions[entity].list())
    })
  }, [])
}
