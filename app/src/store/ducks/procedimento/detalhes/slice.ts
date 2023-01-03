/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComentarioModel, NewComentario } from 'domain/models/comentario'
import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ProcedimentoDetails } from 'services/procedimentos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type VotePayload = {
  aprovado: boolean
  procedimentoId: number
}

export type State = {
  procedimento?: ProcedimentoModel
  formularios: FormularioModel[]
  tipoProcedimento?: TipoProcedimentoModel
  comentarios: ComentarioModel[]
  statusFetch: Status
  statusVote: Status
  statusEncaminhamento: Status
  statusNewComentario: Status
}

export const initialState: State = {
  formularios: [],
  comentarios: [],
  statusFetch: 'pristine',
  statusVote: 'pristine',
  statusNewComentario: 'pristine',
  statusEncaminhamento: 'pristine'
}

const reducers = {
  getInfo: (state: State, action: PayloadAction<number>) => {
    state.formularios = initialState.formularios
    state.procedimento = initialState.procedimento
    state.tipoProcedimento = initialState.tipoProcedimento
    state.comentarios = initialState.comentarios
    state.statusFetch = 'loading'
    state.statusNewComentario = 'pristine'
  },
  getInfoSuccess: (
    state: State,
    action: PayloadAction<ProcedimentoDetails>
  ) => {
    state.statusFetch = 'success'
    state.procedimento = action.payload.procedimento
    state.comentarios = action.payload.comentarios
    state.tipoProcedimento = action.payload.tipoProcedimento
    state.formularios = action.payload.formularios
  },
  getInfoFailure: (state: State) => {
    state.statusFetch = 'failure'
  },
  vote: (state: State, action: PayloadAction<VotePayload>) => {
    state.statusVote = 'loading'
  },
  voteSuccess: (state: State) => {
    state.statusVote = 'success'
  },
  voteFailure: (state: State) => {
    state.statusVote = 'failure'
  },
  comment: (state: State, action: PayloadAction<NewComentario>) => {
    state.statusNewComentario = 'loading'
  },
  commentSuccess: (state: State) => {
    state.statusNewComentario = 'success'
  },
  commentFailure: (state: State) => {
    state.statusNewComentario = 'failure'
  },
  forwardToSecretaria: (state: State) => {
    state.statusEncaminhamento = 'loading'
  },
  forwardToSecretariaSuccess: (state: State) => {
    state.statusEncaminhamento = 'success'
  },
  forwardToSecretariaFailure: (state: State) => {
    state.statusEncaminhamento = 'failure'
  }
}

const procedimentoDetails = createSlice({
  name: 'procedimentoDetails',
  initialState,
  reducers
})

export const actions = procedimentoDetails.actions
export const reducer = procedimentoDetails.reducer
