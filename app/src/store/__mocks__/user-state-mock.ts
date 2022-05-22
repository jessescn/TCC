import { State, initialState } from 'store/ducks/user'

export class UserStateMockBuilder {
  build(): State {
    return { ...initialState }
  }
}
