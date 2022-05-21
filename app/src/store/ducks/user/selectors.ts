import { State } from '..'

export const getRoot = (state: State) => {
  return state.user
}

export const getCreateUserStatus = (state: State) => {
  return state.user.createUserStatus
}
