import { State } from 'store/ducks'

import { State as SessionState } from 'store/ducks/session'
import { State as UserState } from 'store/ducks/user'
import { State as FormState } from 'store/ducks/form'

import { SessionStateMockBuilder } from './session-state-mock'
import { UserStateMockBuilder } from './user-state-mock'
import { FormStateMockBuilder } from './form-state-mock'

export class StateMockBuilder {
  private sessionState = new SessionStateMockBuilder().build()
  private userState = new UserStateMockBuilder().build()
  private formState = new FormStateMockBuilder().build()

  withSessionState(value: SessionState) {
    this.sessionState = value
    return this
  }

  withUserState(value: UserState) {
    this.userState = value
    return this
  }

  withFormState(value: FormState) {
    this.formState = value
    return this
  }

  build(): State {
    return {
      session: this.sessionState,
      user: this.userState,
      form: this.formState
    }
  }
}
