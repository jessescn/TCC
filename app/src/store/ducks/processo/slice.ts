/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProcessoModel } from 'domain/models/processo'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  processos: ProcessoModel[]
  status: Status
}

export type UpdatePayload = {
  data: Partial<ProcessoModel>
  id: number
}

export const initialState: State = {
  processos: [],
  status: 'pristine'
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
  }
}

const processo = createSlice({
  name: 'processo',
  initialState,
  reducers
})

export const actions = processo.actions
export const reducer = processo.reducer
