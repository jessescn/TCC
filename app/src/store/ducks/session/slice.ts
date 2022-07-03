/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserModel } from '../../../domain/models/user'
import { Credentials } from '../../../services/auth'

export type LoginStatus = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  currentUser: UserModel | null
  isSidebarOpen: boolean
  loginStatus: LoginStatus
}

const userLocalStorage = localStorage.getItem('session_user')

export const initialState: State = {
  loginStatus: 'pristine',
  isSidebarOpen: false,
  currentUser: userLocalStorage ? JSON.parse(userLocalStorage) : null
}

const reducers = {
  login: (state: State, action: PayloadAction<Credentials>) => {
    state.loginStatus = 'loading'
  },
  loginSuccess: (state: State, action: PayloadAction<UserModel>) => {
    state.loginStatus = 'success'
    state.currentUser = action.payload
  },
  loginFailure: (state: State) => {
    state.loginStatus = 'failure'
  },
  logout: () => {
    localStorage.removeItem('session_user')
    localStorage.removeItem('access_token')

    document.location.reload()
  },
  toggleSidebar: (state: State) => {
    state.isSidebarOpen = !state.isSidebarOpen
  },
  closeSidebar: (state: State) => {
    state.isSidebarOpen = false
  }
}

const session = createSlice({
  name: 'session',
  initialState,
  reducers
})

export const actions = session.actions
export const reducer = session.reducer
