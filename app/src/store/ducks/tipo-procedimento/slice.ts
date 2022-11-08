/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { NovoTipoProcedimento } from 'services/tipo-procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  tipoProcedimentos: TipoProcedimentoModel[]
  status: Status
  statusUpdate: Status
  statusCreate: Status
}

export type UpdatePayload = {
  data: Partial<TipoProcedimentoModel>
  id: number
}

export type CreatePayload = NovoTipoProcedimento

export const initialState: State = {
  tipoProcedimentos: [],
  status: 'pristine',
  statusUpdate: 'pristine',
  statusCreate: 'pristine'
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
    state.statusCreate = 'loading'
  },
  createSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel>
  ) => {
    state.statusCreate = 'success'
    state.tipoProcedimentos = [...state.tipoProcedimentos, action.payload]
  },
  createFailure: (state: State) => {
    state.statusCreate = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.statusUpdate = 'loading'
  },
  updateSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel>
  ) => {
    state.statusUpdate = 'success'

    const indexof = state.tipoProcedimentos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.tipoProcedimentos.splice(indexof, 1, action.payload)
  },
  updateFailure: (state: State) => {
    state.statusUpdate = 'failure'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.status = 'loading'
  },
  deleteSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel>
  ) => {
    state.status = 'success'
    const idx = state.tipoProcedimentos.findIndex(
      tipo => tipo.id === action.payload.id
    )

    if (idx !== -1) {
      state.tipoProcedimentos.splice(idx, 1, action.payload)
    }
  },
  deleteFailure: (state: State) => {
    state.status = 'failure'
  },
  resetStatus: (state: State) => {
    state.status = 'pristine'
    state.statusUpdate = 'pristine'
    state.statusCreate = 'pristine'
  }
}

const tipoProcedimento = createSlice({
  name: 'tipoProcedimento',
  initialState,
  reducers
})

export const actions = tipoProcedimento.actions
export const reducer = tipoProcedimento.reducer
