import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type State = {
  user: any
}

export const initialState: State = {
  user: {}
}

const reducers = {}

const session = createSlice({
  name: 'session',
  initialState,
  reducers
})

export const actions = session.actions
export const reducer = session.reducer
