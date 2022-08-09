import { useEffect } from 'react'
import { actions, store } from 'store'

type Entity = 'tipoProcedimento' | 'formulario' | 'procedimento'

export const useStore = (entities: Entity[]) => {
  useEffect(() => {
    entities.forEach(entity => {
      store.dispatch(actions[entity].list())
    })
  }, [])
}
