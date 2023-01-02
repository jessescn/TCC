import { Status } from 'domain/models/procedimento'
import { StatusHandler } from '.'

export class DeferidoStatusHandler implements StatusHandler {
  execute = async () => {
    const status: Status = {
      status: 'deferido',
      data: new Date().toISOString()
    }

    return status
  }
}
