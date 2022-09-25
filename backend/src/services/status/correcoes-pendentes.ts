import { Status } from 'domain/models/procedimento'
import { StatusHandler } from '.'

export class CorrecoesPendentesStatusHandler implements StatusHandler {
  execute = async () => {
    const status: Status = {
      status: 'correcoes_pendentes',
      data: new Date().toISOString()
    }

    return status
  }
}
