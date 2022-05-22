import { State } from 'store/ducks'

import { State as SessionState } from 'store/ducks/session'
import { State as UserState } from 'store/ducks/user'
import { SessionStateMockBuilder } from './session-state-mock'
import { UserStateMockBuilder } from './user-state-mock'

export class StateMockBuilder {
  private sessionState = new SessionStateMockBuilder().build()
  private userState = new UserStateMockBuilder().build()

  withSessionState(value: SessionState) {
    this.sessionState = value
    return this
  }

  withUserState(value: UserState) {
    this.userState = value
    return this
  }

  build(): State {
    return {
      session: this.sessionState,
      user: this.userState
    }
  }
}
