/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { UserModel } from '../../../domain/models/user'
import { Credentials } from '../../../services/auth'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type LoginStatus = {
  status: Status
  message?: string
}

export type State = {
  currentUser: UserModel | null
  isSidebarOpen: boolean
  loginStatus: LoginStatus
  sidebarStatus: Status
  openProcedimentos: TipoProcedimentoModel[]
}

const userLocalStorage = localStorage.getItem('session_user')

export const initialState: State = {
  loginStatus: { status: 'pristine' },
  openProcedimentos: [],
  sidebarStatus: 'pristine',
  isSidebarOpen: false,
  currentUser: userLocalStorage ? JSON.parse(userLocalStorage) : null
}

const reducers = {
  login: (state: State, action: PayloadAction<Credentials>) => {
    state.loginStatus = { status: 'loading' }
  },
  loginSuccess: (state: State, action: PayloadAction<UserModel>) => {
    state.loginStatus = { status: 'success' }
    state.currentUser = action.payload
  },
  loginFailure: (state: State, action: PayloadAction<string | undefined>) => {
    state.loginStatus = { status: 'failure', message: action.payload }
  },
  logout: () => {
    localStorage.removeItem('session_user')
    localStorage.removeItem('access_token')

    document.location.reload()
  },
  sidebarInfo: (state: State) => {
    state.sidebarStatus = 'loading'
  },
  sidebarInfoSuccess: (
    state: State,
    action: PayloadAction<TipoProcedimentoModel[]>
  ) => {
    state.sidebarStatus = 'loading'
    state.openProcedimentos = action.payload
  },
  sidebarInfoFailure: (state: State) => {
    state.sidebarStatus = 'failure'
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
