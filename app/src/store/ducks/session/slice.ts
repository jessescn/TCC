import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserModel } from '../../../domain/models/user'
import { Credentials } from '../../../services/auth'

type AuthStatus = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  user: UserModel | null
  authStatus: AuthStatus
}

export const initialState: State = {
  user: null,
  authStatus: 'pristine'
}

const reducers = {
  login: (state: State, action: PayloadAction<Credentials>) => {
    state.authStatus = 'loading'
  },
  loginSuccess: (state: State, action: PayloadAction<UserModel>) => {
    state.authStatus = 'success'
    state.user = action.payload
  },
  loginFailure: (state: State) => {
    state.authStatus = 'failure'
  }
}

const session = createSlice({
  name: 'session',
  initialState,
  reducers
})

export const actions = session.actions
export const reducer = session.reducer
