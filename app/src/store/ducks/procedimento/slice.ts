/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ProcedimentoModel,
  ProcedimentoStatus
} from 'domain/models/procedimento'
import { Pagination, PaginationResponse } from 'services/config'
import { NovoProcedimento, RevisaoPayload } from 'services/procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type UpdatePayload = {
  data: Partial<ProcedimentoModel>
  id: number
}

export type UpdateStatusPayload = {
  id: number
  status: ProcedimentoStatus
}

export type NovaRevisaoPayload = {
  data: RevisaoPayload
  id: number
}

export type State = {
  procedimentos: ProcedimentoModel[]
  status: Status
  statusSubmit: Status
  statusRevisao: Status
  statusUpdateStatus: Status
  pagination: Pagination
  total: number
}

export type CreatePayload = NovoProcedimento

export const initialState: State = {
  procedimentos: [],
  statusSubmit: 'pristine',
  status: 'pristine',
  statusUpdateStatus: 'pristine',
  statusRevisao: 'pristine',
  total: 0,
  pagination: {
    per_page: 5,
    page: 1,
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
    action: PayloadAction<PaginationResponse<ProcedimentoModel>>
  ) => {
    state.status = 'success'
    state.total = action.payload.total
    state.procedimentos = action.payload.data
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.statusUpdateStatus = 'loading'
  },
  updateSuccess: (state: State) => {
    state.statusUpdateStatus = 'success'
  },
  updateFailure: (state: State) => {
    state.statusUpdateStatus = 'failure'
  },
  create: (state: State, action: PayloadAction<CreatePayload>) => {
    state.statusSubmit = 'loading'
  },
  createSuccess: (state: State, action: PayloadAction<ProcedimentoModel>) => {
    state.procedimentos = [...state.procedimentos, action.payload]
    state.statusSubmit = 'success'
  },
  createFailure: (state: State) => {
    state.statusSubmit = 'failure'
  },
  resetStatus: (state: State) => {
    state.status = 'pristine'
    state.statusSubmit = 'pristine'
    state.statusRevisao = 'pristine'
    state.statusUpdateStatus = 'pristine'
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
  updateStatus: (state: State, action: PayloadAction<UpdateStatusPayload>) => {
    state.statusUpdateStatus = 'loading'
  },
  updateStatusSuccess: (
    state: State,
    action: PayloadAction<ProcedimentoModel>
  ) => {
    const indexof = state.procedimentos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.procedimentos.splice(indexof, 1, action.payload)
    state.statusUpdateStatus = 'success'
  },
  updateStatusFailure: (state: State) => {
    state.statusUpdateStatus = 'failure'
  },
  novaRevisao: (state: State, action: PayloadAction<NovaRevisaoPayload>) => {
    state.statusRevisao = 'loading'
  },
  novaRevisaoSuccess: (
    state: State,
    action: PayloadAction<ProcedimentoModel>
  ) => {
    const indexof = state.procedimentos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.procedimentos.splice(indexof, 1, action.payload)
    state.statusRevisao = 'success'
  },
  novaRevisaoFailure: (state: State) => {
    state.statusRevisao = 'failure'
  }
}

const procedimento = createSlice({
  name: 'procedimento',
  initialState,
  reducers
})

export const actions = procedimento.actions
export const reducer = procedimento.reducer
