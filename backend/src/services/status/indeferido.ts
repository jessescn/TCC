import { Status } from 'domain/models/procedimento'
import { StatusHandler } from '.'

export class IndeferidoStatusHandler implements StatusHandler {
  execute = async () => {
    const status: Status = {
      status: 'indeferido',
      data: new Date().toISOString()
    }

    return status
  }
}
