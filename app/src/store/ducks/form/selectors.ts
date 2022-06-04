import { createSelector } from '@reduxjs/toolkit'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.form
}

export const getForms = createSelector([getRoot], state => {
  return state.forms
})

export const getFormsBySearch = createSelector([getRoot], state => {
  return (search: string) =>
    state.forms.filter(form => {
      if (search.localeCompare(String(form.id)) === 0) return true

      if (search.includes(form.status)) return true

      const terms = search.split(' ')
      let includes = false

      terms.forEach(term => {
        if (form.nome.includes(term)) {
          includes = true
        }
      })

      return includes
    })
})
