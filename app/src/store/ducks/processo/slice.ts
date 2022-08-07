/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProcessoModel, ProcessoStatus } from 'domain/models/processo'
import { NovoProcesso, RevisaoPayload } from 'services/processos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  processos: ProcessoModel[]
  status: Status
  statusSubmit: Status
  statusVote: Status
  statusRevisao: Status
  statusUpdateStatus: Status
}

export type UpdatePayload = {
  data: Partial<ProcessoModel>
  id: number
}

export type VotePayload = {
  aprovado: boolean
  processoId: number
}

export type UpdateStatusPayload = {
  id: number
  status: ProcessoStatus
}

export type NovaRevisaoPayload = {
  data: RevisaoPayload
  id: number
}

export type CreatePayload = NovoProcesso

export const initialState: State = {
  processos: [],
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
  listSuccess: (state: State, action: PayloadAction<ProcessoModel[]>) => {
    state.status = 'success'
    state.processos = action.payload
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.status = 'loading'
  },
  updateSuccess: (state: State, action: PayloadAction<ProcessoModel>) => {
    state.status = 'success'

    const indexof = state.processos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.processos.splice(indexof, 1, action.payload)
  },
  updateFailure: (state: State) => {
    state.status = 'failure'
  },
  create: (state: State, action: PayloadAction<CreatePayload>) => {
    state.statusSubmit = 'loading'
  },
  createSuccess: (state: State, action: PayloadAction<ProcessoModel>) => {
    state.processos = [...state.processos, action.payload]
    state.statusSubmit = 'success'
  },
  createFailure: (state: State) => {
    state.statusSubmit = 'failure'
  },
  resetStatus: (state: State) => {
    state.status = 'pristine'
    state.statusSubmit = 'pristine'
    state.statusVote = 'pristine'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.status = 'loading'
  },
  deleteSuccess: (state: State, action: PayloadAction<ProcessoModel>) => {
    state.status = 'success'
    state.processos = state.processos.filter(
      form => form.id !== action.payload.id
    )
  },
  deleteFailure: (state: State) => {
    state.status = 'failure'
  },
  vote: (state: State, action: PayloadAction<VotePayload>) => {
    state.statusVote = 'loading'
  },
  voteSuccess: (state: State, action: PayloadAction<ProcessoModel>) => {
    state.statusVote = 'success'
    const indexof = state.processos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.processos.splice(indexof, 1, action.payload)
  },
  voteFailure: (state: State) => {
    state.statusVote = 'failure'
  },
  updateStatus: (state: State, action: PayloadAction<UpdateStatusPayload>) => {
    state.statusUpdateStatus = 'loading'
  },
  updateStatusSuccess: (state: State, action: PayloadAction<ProcessoModel>) => {
    const indexof = state.processos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.processos.splice(indexof, 1, action.payload)
    state.statusUpdateStatus = 'success'
  },
  updateStatusFailure: (state: State) => {
    state.statusUpdateStatus = 'failure'
  },
  novaRevisao: (state: State, action: PayloadAction<NovaRevisaoPayload>) => {
    state.statusRevisao = 'loading'
  },
  novaRevisaoSuccess: (state: State, action: PayloadAction<ProcessoModel>) => {
    const indexof = state.processos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.processos.splice(indexof, 1, action.payload)
    state.statusRevisao = 'success'
  },
  novaRevisaoFailure: (state: State) => {
    state.statusRevisao = 'failure'
  }
}

const processo = createSlice({
  name: 'processo',
  initialState,
  reducers
})

export const actions = processo.actions
export const reducer = processo.reducer
