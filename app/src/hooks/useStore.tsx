import { useEffect, useRef } from 'react'
import { actions, store } from 'store'

export type Entity = 'procedimento'

export const useStore = (entities: Entity[]) => {
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    entities.forEach(entity => {
      store.dispatch(actions[entity].list({ page: 1, per_page: 5, term: null }))
    })
    ref.current = true
  }, [])
}
