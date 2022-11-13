/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ProcedimentoModel,
  ProcedimentoStatus
} from 'domain/models/procedimento'
import { Pagination, PaginationResponse } from 'services/config'
import { NovoProcedimento, RevisaoPayload } from 'services/procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  procedimentos: ProcedimentoModel[]
  status: Status
  statusVote: Status
  pagination: Pagination
  total: number
}

export type UpdatePayload = {
  data: Partial<ProcedimentoModel>
  id: number
}

export type VotePayload = {
  aprovado: boolean
  procedimentoId: number
}

export type UpdateStatusPayload = {
  id: number
  status: ProcedimentoStatus
}

export type NovaRevisaoPayload = {
  data: RevisaoPayload
  id: number
}

export type CreatePayload = NovoProcedimento

export const initialState: State = {
  procedimentos: [],
  status: 'pristine',
  statusVote: 'pristine',
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
  vote: (state: State, action: PayloadAction<VotePayload>) => {
    state.statusVote = 'loading'
  },
  voteSuccess: (state: State) => {
    state.statusVote = 'success'
  },
  voteFailure: (state: State) => {
    state.statusVote = 'failure'
  }
}

const colegiado = createSlice({
  name: 'colegiado',
  initialState,
  reducers
})

export const actions = colegiado.actions
export const reducer = colegiado.reducer
