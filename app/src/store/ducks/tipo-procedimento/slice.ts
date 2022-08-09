/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { NovoTipoProcedimento } from 'services/tipo-procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  tipoProcedimentos: TipoProcedimentoModel[]
  status: Status
}

export type UpdatePayload = {
  data: Partial<TipoProcedimentoModel>
  id: number
}

export type CreatePayload = NovoTipoProcedimento

export const initialState: State = {
  tipoProcedimentos: [],
  status: 'pristine'
}

const reducers = {
  list: (state: State) => {
    state.status = 'loading'
  },
  listSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel[]>
  ) => {
    state.status = 'success'
    state.tipoProcedimentos = action.payload
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  create: (state: State, action: PayloadAction<CreatePayload>) => {
    state.status = 'loading'
  },
  createSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel>
  ) => {
    state.status = 'success'
    state.tipoProcedimentos = [...state.tipoProcedimentos, action.payload]
  },
  createFailure: (state: State) => {
    state.status = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.status = 'loading'
  },
  updateSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel>
  ) => {
    state.status = 'success'

    const indexof = state.tipoProcedimentos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.tipoProcedimentos.splice(indexof, 1, action.payload)
  },
  updateFailure: (state: State) => {
    state.status = 'failure'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.status = 'loading'
  },
  deleteSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel>
  ) => {
    state.status = 'success'
    state.tipoProcedimentos = state.tipoProcedimentos.filter(
      tipo => tipo.id !== action.payload.id
    )
  },
  deleteFailure: (state: State) => {
    state.status = 'failure'
  }
}

const tipoProcedimento = createSlice({
  name: 'tipoProcedimento',
  initialState,
  reducers
})

export const actions = tipoProcedimento.actions
export const reducer = tipoProcedimento.reducer
