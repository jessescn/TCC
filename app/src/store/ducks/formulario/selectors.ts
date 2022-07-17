import { createSelector } from '@reduxjs/toolkit'
import { ProcessoModel } from 'domain/models/processo'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { State } from '..'
import { getTipoProcessoByProcesso } from '../tipo-processo/selectors'

export const getRoot = (state: State) => {
  return state.form
}

export const getFormularios = createSelector([getRoot], state => {
  return state.forms
})

export const getFormularioById = createSelector(
  [getFormularios],
  forms => (id: number) => {
    return forms.find(form => form.id === id)
  }
)

export const getFormulariosBySearch = createSelector(
  [getFormularios],
  forms => {
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
  }
)

export const getFormulariosByTipoProcesso = createSelector(
  [getFormularios],
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

export const getFormulariosByProcesso = createSelector(
  [getFormulariosByTipoProcesso],
  formulariosByTipoProcesso => {
    return (processo?: ProcessoModel) => {
      if (!processo) {
        return []
      }

      return formulariosByTipoProcesso(processo.tipo_processo)
    }
  }
)
