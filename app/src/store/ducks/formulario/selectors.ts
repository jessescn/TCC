import { createSelector } from '@reduxjs/toolkit'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.formulario
}

export const getFormularios = createSelector([getRoot], state => {
  return state.formularios
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

export const getFormulariosByTipoProcedimento = createSelector(
  [getFormularios],
  formularios => {
    return (tipoProcedimento?: TipoProcedimentoModel) => {
      if (!tipoProcedimento) {
        return []
      }

      return formularios.filter(formulario =>
        tipoProcedimento.formularios.includes(formulario.id)
      )
    }
  }
)

export const getFormulariosByProcedimento = createSelector(
  [getFormulariosByTipoProcedimento],
  formulariosByTipoProcedimento => {
    return (procedimento?: ProcedimentoModel) => {
      if (!procedimento) {
        return []
      }

      return formulariosByTipoProcedimento(procedimento.tipo_procedimento)
    }
  }
)
