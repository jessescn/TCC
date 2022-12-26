/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { AuthCredentials } from 'services/auth'
import { UserModel } from '../../../domain/models/user'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type StatusWithMessage = {
  status: Status
  message?: string
}

type LogoutOptions = {
  reload: boolean
}

export type State = {
  currentUser: UserModel | null
  isSidebarOpen: boolean
  loginStatus: StatusWithMessage
  authStatus: Status
  exchangeCodeStatus: StatusWithMessage
  sidebarStatus: Status
  sendEmailStatus: Status
  openProcedimentos: TipoProcedimentoModel[]
}

const userLocalStorage = localStorage.getItem('session_user')

export const initialState: State = {
  loginStatus: { status: 'pristine' },
  exchangeCodeStatus: { status: 'pristine' },
  openProcedimentos: [],
  authStatus: 'pristine',
  sidebarStatus: 'pristine',
  sendEmailStatus: 'pristine',
  isSidebarOpen: false,
  currentUser: userLocalStorage ? JSON.parse(userLocalStorage) : null
}

const reducers = {
  resetState: (state: State) => {
    state.currentUser = initialState.currentUser
    state.openProcedimentos = initialState.openProcedimentos
    state.isSidebarOpen = initialState.isSidebarOpen
    state.sidebarStatus = initialState.sidebarStatus
    state.loginStatus = initialState.loginStatus
    state.authStatus = initialState.authStatus
  },
  login: (state: State, action: PayloadAction<AuthCredentials>) => {
    state.loginStatus = { status: 'loading' }
  },
  loginSuccess: (state: State, action: PayloadAction<UserModel>) => {
    state.loginStatus = { status: 'success' }
    state.currentUser = action.payload
  },
  loginFailure: (state: State, action: PayloadAction<string | undefined>) => {
    state.loginStatus = { status: 'failure', message: action.payload }
  },
  logout: (state: State, action: PayloadAction<LogoutOptions>) => {
    reducers.resetState(state)

    localStorage.removeItem('session_user')
    localStorage.removeItem('access_token')

    if (action.payload.reload) document.location.reload()
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
  },
  sendEmailConfirmation: (state: State) => {
    state.sendEmailStatus = 'loading'
  },
  sendEmailConfirmationSuccess: (state: State) => {
    state.sendEmailStatus = 'success'
  },
  sendEmailConfirmationFailure: (state: State) => {
    state.sendEmailStatus = 'failure'
  },
  exchangeEmailConfirmationCode: (
    state: State,
    action: PayloadAction<string>
  ) => {
    state.exchangeCodeStatus = { status: 'loading' }
  },
  exchangeEmailConfirmationCodeSuccess: (
    state: State,
    action: PayloadAction<UserModel>
  ) => {
    state.exchangeCodeStatus = { status: 'success' }
    state.currentUser = action.payload
  },
  exchangeEmailConfirmationCodeFailure: (
    state: State,
    action: PayloadAction<string | undefined>
  ) => {
    state.exchangeCodeStatus = { status: 'failure', message: action.payload }
  },
  me: (state: State) => {
    state.authStatus = 'loading'
  },
  meSuccess: (state: State, action: PayloadAction<UserModel>) => {
    state.authStatus = 'success'
    state.currentUser = action.payload
  },
  meFailure: (state: State) => {
    state.authStatus = 'failure'
    state.currentUser = null
  }
}

const session = createSlice({
  name: 'session',
  initialState,
  reducers
})

export const actions = session.actions
export const reducer = session.reducer
