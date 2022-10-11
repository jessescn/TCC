import { CreateActorController } from 'controllers/actor/create'
import { DeleteActorController } from 'controllers/actor/delete'
import { PublicosController } from 'controllers/actor/publicos'
import { ReadActorController } from 'controllers/actor/read'
import { ReadOneActorController } from 'controllers/actor/read-one'
import { UpdateActorController } from 'controllers/actor/update'
import {
  createActorController,
  deleteActorController,
  publicosController,
  readActorController,
  readOneActorController,
  updateActorController
} from '..'

describe('Actor Controller Factories', () => {
  it('should create a instance of CreateActorController', () => {
    expect(createActorController).toBeInstanceOf(CreateActorController)
  })

  it('should create a instance of DeleteActorController', () => {
    expect(deleteActorController).toBeInstanceOf(DeleteActorController)
  })

  it('should create a instance of PublicosController', () => {
    expect(publicosController).toBeInstanceOf(PublicosController)
  })

  it('should create a instance of ReadActorController', () => {
    expect(readActorController).toBeInstanceOf(ReadActorController)
  })

  it('should create a instance of ReadOneActorController', () => {
    expect(readOneActorController).toBeInstanceOf(ReadOneActorController)
  })

  it('should create a instance of UpdateActorController', () => {
    expect(updateActorController).toBeInstanceOf(UpdateActorController)
  })
})
