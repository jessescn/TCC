import { Status } from 'models/procedimento'
import { StatusHandler } from '.'

export class CriadoStatusHandler implements StatusHandler {
  execute = async () => {
    const statusCriado: Status = {
      status: 'criado',
      data: new Date().toISOString()
    }

    return statusCriado
  }
}
