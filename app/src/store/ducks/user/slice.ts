/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CreateUser } from '../../../services/user'

type CreateUserStatus = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  createUserStatus: CreateUserStatus
}

export const initialState: State = {
  createUserStatus: 'pristine'
}

const reducers = {
  create: (state: State, action: PayloadAction<CreateUser>) => {
    state.createUserStatus = 'loading'
  },
  createSuccess: (state: State) => {
    state.createUserStatus = 'success'
  },
  createFailure: (state: State) => {
    state.createUserStatus = 'failure'
  }
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers
})

export const actions = user.actions
export const reducer = user.reducer
