/* istanbul ignore file */
import Actor from 'domain/models/actor'
import Formulario from 'domain/models/formulario'
import Profile from 'domain/models/profile'
import TipoProcedimento from 'domain/models/tipo-procedimento'
import { actors } from 'domain/profiles'
import { CreateActor } from 'repository/sequelize/actor'
import { NewFormulario } from 'repository/sequelize/formulario'
import { CreateProfile } from 'repository/sequelize/profile'
import { NewTipoProcedimento } from 'repository/sequelize/tipo-procedimento'
import mock from 'types/campos-formulario/modelo-mockado'

export const createInitialProfile = async ({
  nome,
  permissoes
}: CreateProfile) => {
  return Profile.findOrCreate({
    where: { nome },
    defaults: {
      nome,
      permissoes
    }
  })
}

export const createInitialUser = async ({
  email,
  nome,
  senha,
  profile
}: CreateActor) => {
  await Actor.findOrCreate({
    where: { email },
    defaults: {
      senha,
      email,
      nome,
      permissoes: profile
    }
  })
}

export const createInitialFormulario = async (formulario: NewFormulario) => {
  Formulario.findOrCreate({
    where: {
      nome: formulario.nome
    },
    defaults: formulario
  })
}

export const createInitialTipoProcedimento = async (
  tipoProcedimento: NewTipoProcedimento
) => {
  await TipoProcedimento.findOrCreate({
    where: {
      nome: tipoProcedimento.nome
    },
    defaults: tipoProcedimento
  })
}

export const populateInitialData = async () => {
  const [profile] = await createInitialProfile({
    nome: 'admin',
    permissoes: actors.admin
  })

  await createInitialProfile({ nome: 'usuario', permissoes: actors.usuario })
  await createInitialProfile({
    nome: 'colegiado',
    permissoes: actors.colegiado
  })

  await createInitialUser({
    nome: 'admin',
    email: process.env.ADMIN_EMAIL,
    senha: process.env.ADMIN_PASSWORD,
    profile: profile.id
  })

  await createInitialFormulario(mock.formulario)
  await createInitialTipoProcedimento(mock.tipoProcedimento)
}
