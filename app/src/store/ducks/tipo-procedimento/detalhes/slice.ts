/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormularioModel } from 'domain/models/formulario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { NovoTipoProcedimento } from 'services/tipo-procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  tipoProcedimento?: TipoProcedimentoModel
  formularios: FormularioModel[]
  publicos: string[]
  statusFetch: Status
}

export type UpdatePayload = {
  data: Partial<TipoProcedimentoModel>
  id: number
}

export type CreatePayload = NovoTipoProcedimento

export type TipoProcedimentoDetails = {
  tipo?: TipoProcedimentoModel
  formularios: FormularioModel[]
  publicos: string[]
}

export const initialState: State = {
  statusFetch: 'pristine',
  formularios: [],
  publicos: []
}

const reducers = {
  getInfo: (state: State, action: PayloadAction<string | null>) => {
    state.statusFetch = 'loading'
    state.formularios = []
    state.publicos = []
    state.tipoProcedimento = undefined
  },
  getInfoSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoDetails>
  ) => {
    state.statusFetch = 'success'
    state.tipoProcedimento = action.payload.tipo
    state.formularios = action.payload.formularios
    state.publicos = action.payload.publicos
  },
  getInfoFailure: (state: State) => {
    state.statusFetch = 'failure'
  },
  resetStatus: (state: State) => {
    state.statusFetch = 'pristine'
    state.tipoProcedimento = undefined
  }
}

const tipoProcedimentoDetalhes = createSlice({
  name: 'tipoProcedimentoDetalhes',
  initialState,
  reducers
})

export const actions = tipoProcedimentoDetalhes.actions
export const reducer = tipoProcedimentoDetalhes.reducer
