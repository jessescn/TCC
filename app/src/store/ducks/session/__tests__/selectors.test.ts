import { UserMockBuilderBuilder } from 'domain/__mocks__/user-mock'
import { SessionStateMockBuilder } from 'store/__mocks__/session-state-mock'
import { StateMockBuilder } from 'store/__mocks__/state-mock-builder'
import { getAuthStatus, getCurrentUser } from '../selectors'
import { initialState } from '../slice'

describe('Testes dos seletores de session', () => {
  const currentUser = new UserMockBuilderBuilder().build()

  const sessionState = new SessionStateMockBuilder()
    .withCurrentUser(currentUser)
    .build()

  const coreState = new StateMockBuilder()
    .withSessionState(sessionState)
    .build()

  test('getAuthStatus: deve retornar o status do login', () => {
    const result = getAuthStatus(coreState)

    expect(result).toEqual(initialState.loginStatus)
  })

  test('getCurrentUser: deve retornar o usuário atual ou null caso não exista', () => {
    const result = getCurrentUser(coreState)

    expect(result).toEqual(currentUser)
  })
})
