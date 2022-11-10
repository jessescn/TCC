/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ProcedimentoModel,
  ProcedimentoStatus
} from 'domain/models/procedimento'
import { NovoProcedimento, RevisaoPayload } from 'services/procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  procedimentos: ProcedimentoModel[]
  status: Status
  statusSubmit: Status
  statusVote: Status
  statusRevisao: Status
  statusUpdateStatus: Status
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
  statusVote: 'pristine',
  statusSubmit: 'pristine',
  status: 'pristine',
  statusUpdateStatus: 'pristine',
  statusRevisao: 'pristine'
}

const reducers = {
  list: (state: State) => {
    state.status = 'loading'
  },
  listSuccess: (state: State, action: PayloadAction<ProcedimentoModel[]>) => {
    state.status = 'success'
    state.procedimentos = action.payload
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.statusUpdateStatus = 'loading'
  },
  updateSuccess: (state: State, action: PayloadAction<ProcedimentoModel>) => {
    state.statusUpdateStatus = 'success'

    const indexof = state.procedimentos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.procedimentos.splice(indexof, 1, action.payload)
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
    state.statusVote = 'pristine'
    state.statusRevisao = 'pristine'
    state.statusUpdateStatus = 'pristine'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.status = 'loading'
  },
  deleteSuccess: (state: State, action: PayloadAction<ProcedimentoModel>) => {
    state.status = 'success'
    state.procedimentos = state.procedimentos.filter(
      form => form.id !== action.payload.id
    )
  },
  deleteFailure: (state: State) => {
    state.status = 'failure'
  },
  vote: (state: State, action: PayloadAction<VotePayload>) => {
    state.statusVote = 'loading'
  },
  voteSuccess: (state: State, action: PayloadAction<ProcedimentoModel>) => {
    state.statusVote = 'success'
    const indexof = state.procedimentos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.procedimentos.splice(indexof, 1, action.payload)
  },
  voteFailure: (state: State) => {
    state.statusVote = 'failure'
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
