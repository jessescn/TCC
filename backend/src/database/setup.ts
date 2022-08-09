/* istanbul ignore file */
import { createInitialFormulario } from 'models/formulario'
import { createInitialTipoProcedimento } from 'models/tipo-procedimento'
import { createInitialUser } from 'models/user'
import { Admin, Default } from 'types/auth/actors'
import mock from 'types/campos-formulario/modelo-mockado'

export const populateInitialData = async () => {
  await createInitialUser({
    email: process.env.ADMIN_EMAIL,
    permissoes: { ...Admin } as any,
    roles: ['usuario', 'admin'],
    senha: process.env.ADMIN_PASSWORD
  })

  await createInitialUser({
    email: process.env.DEFAULT_USER_EMAIL,
    permissoes: { ...Default } as any,
    roles: ['usuario'],
    senha: process.env.DEFAULT_USER_PASSWORD
  })

  await createInitialFormulario(mock.formulario)
  await createInitialTipoProcedimento(mock.tipoProcedimento)
}
