/* istanbul ignore file */
import Actor from 'domain/models/actor'
import Formulario from 'domain/models/formulario'
import Profile from 'domain/models/profile'
import TipoProcedimento from 'domain/models/tipo-procedimento'
import { actors } from 'domain/profiles'
import { CreateActor } from 'repositories/sequelize/actor'
import { NewFormulario } from 'repositories/sequelize/formulario'
import { CreateProfile } from 'repositories/sequelize/profile'
import { NewTipoProcedimento } from 'repositories/sequelize/tipo-procedimento'

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
      permissoes: profile,
      verificado: true
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
    nome: 'secretaria',
    permissoes: actors.secretaria
  })
  await createInitialProfile({
    nome: 'coordenacao',
    permissoes: actors.coordenacao
  })
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
}
