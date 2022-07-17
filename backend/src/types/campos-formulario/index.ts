type CampoTipoBase = {
  titulo?: string
  descricao?: string
}

export type CampoTipoResposta = CampoTipoBase

export type CampoTipoData = CampoTipoBase

export type CampoTipoHora = CampoTipoBase

export type CampoTipoParagrafo = CampoTipoBase

export type CampoTipoEscolhaMultipla = CampoTipoBase & {
  opcoes: string[]
  outro?: boolean
}

export type CampoTipoCaixaVerificacao = CampoTipoBase & {
  opcoes: string[]
  outro?: boolean
}

export type CampoTipoFicheiro = CampoTipoBase & {
  quantidade_arquivos: number
  tamanho_maximo: number
}

export type CampoTipoGrelhaMultipla = CampoTipoBase & {
  linhas: string[]
  colunas: string[]
}

export type CampoTipoGrelhaVerificacao = CampoTipoBase & {
  linhas: string[]
  colunas: string[]
}

export type CampoTipos = {
  paragrafo: CampoTipoParagrafo
  resposta: CampoTipoResposta
  data: CampoTipoData
  hora: CampoTipoHora
  ficheiro: CampoTipoFicheiro
  escolha_multipla: CampoTipoEscolhaMultipla
  caixa_verificacao: CampoTipoCaixaVerificacao
  grelha_multipla: CampoTipoGrelhaMultipla
  grelha_verificacao: CampoTipoGrelhaVerificacao
}
