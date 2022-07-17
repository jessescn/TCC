import { createSelector } from '@reduxjs/toolkit'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.form
}

export const getForms = createSelector([getRoot], state => {
  return state.forms
})

export const getFormById = createSelector([getForms], forms => (id: number) => {
  console.log(forms)

  return forms.find(form => form.id === id)
})

export const getFormsBySearch = createSelector([getForms], forms => {
  return (search: string) =>
    forms.filter(form => {
      if (search.localeCompare(String(form.id)) === 0) return true

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

export const getFormsByTipoProcesso = createSelector(
  [getForms],
  formularios => {
    return (tipoProcesso?: TipoProcessoModel) => {
      if (!tipoProcesso) {
        return []
      }

      return formularios.filter(formulario =>
        tipoProcesso.formularios.includes(formulario.id)
      )
    }
  }
)
