import { UserModel } from 'domain/models/user'
import { State, initialState } from 'store/ducks/session'

export class SessionStateMockBuilder {
  private currentUser: UserModel | null = null

  withCurrentUser(value: UserModel) {
    this.currentUser = value
    return this
  }

  build(): State {
    return { ...initialState, currentUser: this.currentUser }
  }
}
