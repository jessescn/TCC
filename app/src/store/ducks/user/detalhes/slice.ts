/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserModel, ProfileModel } from 'domain/models/user'
import { UpdateUser } from 'services/usuarios'

type Status = 'pristine' | 'loading' | 'success' | 'failure'

export type State = {
  usuario?: UserModel
  statusFetch: Status
  statusUpdate: Status
  profiles: ProfileModel[]
  publicos: string[]
}

export const initialState: State = {
  statusFetch: 'pristine',
  statusUpdate: 'pristine',
  usuario: undefined,
  profiles: [],
  publicos: []
}

export type UpdatePayload = {
  data: UpdateUser
  id: number
}

export type GetInfoResponse = {
  usuario: UserModel
  profiles: ProfileModel[]
  publicos: string[]
}

const reducers = {
  getInfo: (state: State, action: PayloadAction<number>) => {
    state.statusFetch = 'loading'
    state.usuario = undefined
    state.profiles = []
  },
  getInfoSuccess: (state: State, action: PayloadAction<GetInfoResponse>) => {
    state.statusFetch = 'success'
    state.usuario = action.payload.usuario
    state.profiles = action.payload.profiles
    state.publicos = action.payload.publicos
  },
  getInfoFailure: (state: State) => {
    state.statusFetch = 'failure'
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
  reset: (state: State) => {
    state.statusFetch = initialState.statusFetch
    state.statusUpdate = initialState.statusUpdate
    state.usuario = undefined
    state.profiles = []
    state.publicos = []
  }
}

const userDetails = createSlice({
  name: 'userDetails',
  initialState,
  reducers
})

export const actions = userDetails.actions
export const reducer = userDetails.reducer
