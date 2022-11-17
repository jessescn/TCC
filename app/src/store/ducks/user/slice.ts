/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateUser } from '../../../services/user'

type CreateUserStatus = {
  status: 'pristine' | 'loading' | 'success' | 'failure'
  message?: string
}

export type State = {
  createUserStatus: CreateUserStatus
}

export const initialState: State = {
  createUserStatus: { status: 'pristine' }
}

const reducers = {
  create: (state: State, action: PayloadAction<CreateUser>) => {
    state.createUserStatus = { status: 'loading' }
  },
  createSuccess: (state: State) => {
    state.createUserStatus = { status: 'success' }
  },
  createFailure: (state: State, action: PayloadAction<string | undefined>) => {
    state.createUserStatus = { status: 'failure', message: action.payload }
  },
  resetState: (state: State) => {
    state.createUserStatus = initialState.createUserStatus
  }
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers
})

export const actions = user.actions
export const reducer = user.reducer
