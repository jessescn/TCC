/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { Pagination, PaginationResponse } from 'services/config'
import { NovoTipoProcedimento } from 'services/tipo-procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  tipoProcedimentos: TipoProcedimentoModel[]
  total: number
  status: Status
  statusUpdate: Status
  statusCreate: Status
  pagination: Pagination
}

export type UpdatePayload = {
  data: Partial<TipoProcedimentoModel>
  id: number
}

export type CreatePayload = NovoTipoProcedimento

export const initialState: State = {
  tipoProcedimentos: [],
  total: 0,
  status: 'pristine',
  statusUpdate: 'pristine',
  statusCreate: 'pristine',
  pagination: {
    page: 1,
    per_page: 5,
    term: null
  }
}

const reducers = {
  list: (state: State, action: PayloadAction<Pagination>) => {
    state.status = 'loading'
    state.pagination = action.payload
  },
  listSuccess: (
    state: State,
    action: PayloadAction<PaginationResponse<TipoProcedimentoModel>>
  ) => {
    state.status = 'success'
    state.tipoProcedimentos = action.payload.data
    state.total = action.payload.total
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
  updateSuccess: (state: State) => {
    state.statusUpdate = 'success'
  },
  updateFailure: (state: State) => {
    state.statusUpdate = 'failure'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.status = 'loading'
  },
  deleteSuccess: (state: State) => {
    state.status = 'success'
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
