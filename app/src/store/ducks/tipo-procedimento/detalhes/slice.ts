/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormularioModel } from 'domain/models/formulario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import {
  NovoTipoProcedimento,
  TipoProcedimentoDetails
} from 'services/tipo-procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  tipoProcedimento?: TipoProcedimentoModel
  statusFetch: Status
}

export type UpdatePayload = {
  data: Partial<TipoProcedimentoModel>
  id: number
}

export type CreatePayload = NovoTipoProcedimento

export const initialState: State = {
  statusFetch: 'pristine'
}

const reducers = {
  getInfo: (state: State, action: PayloadAction<number>) => {
    state.statusFetch = 'loading'
  },
  getInfoSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoDetails>
  ) => {
    state.statusFetch = 'success'
    state.tipoProcedimento = action.payload.tipo
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
