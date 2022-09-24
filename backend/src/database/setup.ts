/* istanbul ignore file */
import Formulario from 'models/formulario'
import { createInitialTipoProcedimento } from 'models/tipo-procedimento'
import { createInitialUser } from 'models/user'
import { NewFormulario } from 'repository/sequelize/formulario'
import { actorsPermissions } from 'types/auth/actors'
import mock from 'types/campos-formulario/modelo-mockado'

export const createInitialFormulario = async (formulario: NewFormulario) => {
  Formulario.findOrCreate({
    where: {
      nome: formulario.nome
    },
    defaults: formulario
  })
}

export const populateInitialData = async () => {
  await createInitialUser({
    email: process.env.ADMIN_EMAIL,
    permissoes: { ...actorsPermissions.admin } as any,
    roles: ['usuario', 'admin'],
    senha: process.env.ADMIN_PASSWORD
  })

  await createInitialFormulario(mock.formulario)
  await createInitialTipoProcedimento(mock.tipoProcedimento)
}
