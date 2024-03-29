/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { Pagination, PaginationResponse } from 'services/config'
import { NovoFormulario } from 'services/formularios'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  formularios: FormularioModel[]
  total: number
  status: Status
  statusCreate: Status
  statusUpdate: Status
  pagination: Pagination
}

export type UpdatePayload = {
  data: Partial<FormularioModel>
  id: number
}

export type CreatePayload = NovoFormulario

export const initialState: State = {
  formularios: [],
  total: 0,
  status: 'pristine',
  statusCreate: 'pristine',
  statusUpdate: 'pristine',
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
    action: PayloadAction<PaginationResponse<FormularioModel>>
  ) => {
    state.status = 'success'
    state.total = action.payload.total
    state.formularios = action.payload.data
  },
  listFailure: (state: State) => {
    state.status = 'failure'
  },
  create: (state: State, action: PayloadAction<CreatePayload>) => {
    state.statusCreate = 'loading'
  },
  createSuccess: (state: State, action: PayloadAction<FormularioModel>) => {
    state.statusCreate = 'success'
    state.formularios = [...state.formularios, action.payload]
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
    state.statusCreate = 'pristine'
    state.statusUpdate = 'pristine'
  }
}

const form = createSlice({
  name: 'form',
  initialState,
  reducers
})

export const actions = form.actions
export const reducer = form.reducer
