/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { NovoTipoProcesso } from 'services/tipo-processos'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  tipoProcessos: TipoProcessoModel[]
  status: Status
}

export type UpdatePayload = {
  data: Partial<TipoProcessoModel>
  id: number
}

export type CreatePayload = NovoTipoProcesso

export const initialState: State = {
  tipoProcessos: [],
  status: 'pristine'
}

const reducers = {
  list: (state: State) => {
    state.status = 'loading'
  },
  listSuccess: (state: State, action: PayloadAction<TipoProcessoModel[]>) => {
    state.status = 'success'
    state.tipoProcessos = action.payload
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  create: (state: State, action: PayloadAction<CreatePayload>) => {
    state.status = 'loading'
  },
  createSuccess: (state: State, action: PayloadAction<TipoProcessoModel>) => {
    state.status = 'success'
    state.tipoProcessos = [...state.tipoProcessos, action.payload]
  },
  createFailure: (state: State) => {
    state.status = 'failure'
  },
  update: (state: State, action: PayloadAction<UpdatePayload>) => {
    state.status = 'loading'
  },
  updateSuccess: (state: State, action: PayloadAction<TipoProcessoModel>) => {
    state.status = 'success'

    const indexof = state.tipoProcessos
      .map(elm => elm.id)
      .indexOf(action.payload.id)
    state.tipoProcessos.splice(indexof, 1, action.payload)
  },
  updateFailure: (state: State) => {
    state.status = 'failure'
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.status = 'loading'
  },
  deleteSuccess: (state: State, action: PayloadAction<TipoProcessoModel>) => {
    state.status = 'success'
    state.tipoProcessos = state.tipoProcessos.filter(
      tipo => tipo.id !== action.payload.id
    )
  },
  deleteFailure: (state: State) => {
    state.status = 'failure'
  }
}

const tipoProcesso = createSlice({
  name: 'tipoProcesso',
  initialState,
  reducers
})

export const actions = tipoProcesso.actions
export const reducer = tipoProcesso.reducer
