import { useEffect } from 'react'
import { actions, store } from 'store'

type Entity = 'tipoProcesso' | 'form' | 'processo'

export const useStore = (entities: Entity[]) => {
  useEffect(() => {
    entities.forEach(entity => {
      store.dispatch(actions[entity].list())
    })
  }, [])
}
