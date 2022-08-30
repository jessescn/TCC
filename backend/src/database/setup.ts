/* istanbul ignore file */
import { createInitialFormulario } from 'models/formulario'
import { createInitialTipoProcedimento } from 'models/tipo-procedimento'
import { createInitialUser } from 'models/user'
import { admin } from 'types/auth/actors'
import mock from 'types/campos-formulario/modelo-mockado'

export const populateInitialData = async () => {
  await createInitialUser({
    email: process.env.ADMIN_EMAIL,
    permissoes: { ...admin } as any,
    roles: ['usuario', 'admin'],
    senha: process.env.ADMIN_PASSWORD
  })

  await createInitialFormulario(mock.formulario)
  await createInitialTipoProcedimento(mock.tipoProcedimento)
}
