/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserModel } from 'domain/models/user'
import { Pagination, PaginationResponse } from 'services/config'
import { CreateUser } from 'services/usuarios'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

type CreateUserStatus = {
  status: Status
  message?: string
}

export type CreateBulk = {
  file: File
}

export type State = {
  usuarios: UserModel[]
  total: number
  pagination: Pagination
  statusCreate: CreateUserStatus
  statusCreateBulk: CreateUserStatus
  statusFetch: Status
  statusDelete: Status
}

export const initialState: State = {
  usuarios: [],
  total: 0,
  pagination: {
    page: 1,
    per_page: 5,
    term: null
  },
  statusFetch: 'pristine',
  statusCreate: { status: 'pristine' },
  statusCreateBulk: { status: 'pristine' },
  statusDelete: 'pristine'
}

const reducers = {
  list: (state: State, action: PayloadAction<Pagination>) => {
    state.statusFetch = 'loading'
    state.pagination = action.payload
  },
  listSuccess: (
    state: State,
    action: PayloadAction<PaginationResponse<UserModel>>
  ) => {
    state.statusFetch = 'success'
    state.total = action.payload.total
    state.usuarios = action.payload.data
  },
  listFailure: (state: State) => {
    state.statusFetch = 'failure'
  },
  create: (state: State, action: PayloadAction<CreateUser>) => {
    state.statusCreate = { status: 'loading' }
  },
  createSuccess: (state: State) => {
    state.statusCreate = { status: 'success' }
  },
  createFailure: (state: State, action: PayloadAction<string | undefined>) => {
    state.statusCreate = { status: 'failure', message: action.payload }
  },
  createBulk: (state: State, action: PayloadAction<CreateBulk>) => {
    state.statusCreateBulk = { status: 'loading' }
  },
  createBulkSuccess: (state: State) => {
    state.statusCreateBulk = { status: 'success' }
  },
  createBulkFailure: (
    state: State,
    action: PayloadAction<string | undefined>
  ) => {
    state.statusCreateBulk = { status: 'failure', message: action.payload }
  },
  delete: (state: State, action: PayloadAction<number>) => {
    state.statusDelete = 'loading'
  },
  deleteSuccess: (state: State) => {
    state.statusDelete = 'success'
  },
  deleteFailure: (state: State) => {
    state.statusDelete = 'failure'
  },
  resetStatus: (state: State) => {
    state.statusCreate = initialState.statusCreate
    state.statusFetch = initialState.statusFetch
    state.statusDelete = initialState.statusDelete
    state.statusCreateBulk = initialState.statusCreateBulk
  },
  resetState: (state: State) => {
    reducers.resetStatus(state)
    state.total = initialState.total
    state.usuarios = initialState.usuarios
  }
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers
})

export const actions = user.actions
export const reducer = user.reducer
