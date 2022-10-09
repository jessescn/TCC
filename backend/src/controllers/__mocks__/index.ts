import { ActorModel } from 'domain/models/actor'
import { ProfileModel } from 'domain/models/profile'
import { PermissionKey } from 'domain/profiles'
import { createMock } from 'ts-auto-mock'

export const baseSetup = (permissao?: PermissionKey) => {
  const permissoes = permissao ? { [permissao]: 'all' } : {}

  const actor = createMock<ActorModel>({
    profile: createMock<ProfileModel>({ permissoes })
  })

  const sendSpy = jest.fn()
  const jsonSpy = jest.fn()

  const response = {
    status: jest.fn().mockReturnValue({ send: sendSpy }),
    json: jsonSpy
  }

  return {
    response,
    spies: {
      sendSpy,
      jsonSpy
    },
    actor
  }
}
