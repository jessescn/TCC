import { RemoteFormulario } from 'controllers/formulario'
import { RemoteTipoProcesso } from 'controllers/tipo-processo'

const formulario: RemoteFormulario = {
  nome: 'Solicitação de Homologação de Comissão Examinadora de Defesa de Dissertação de Mestrado',
  descricao:
    'Antes de preencher este formulário, é importante que o orientador verifique se a banca a ser definida atende a Norma PPGCC-01/19: Requisitos para Homologação de Bancas Examinadoras de Mestrado e Doutorado.',
  campos: [
    {
      ordem: 0,
      tipo: 'paragrafo',
      obrigatorio: false,
      configuracao_campo: { titulo: 'Dados do candidato' }
    },
    {
      ordem: 1,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Candidato' }
    },
    {
      ordem: 2,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Orientador Principal' }
    },
    {
      ordem: 3,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: { titulo: 'Orientador Secundário (se existir)' }
    },
    {
      ordem: 4,
      tipo: 'paragrafo',
      obrigatorio: false,
      configuracao_campo: { titulo: 'Dados do trabalho' }
    },
    {
      ordem: 5,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Título do trabalho' }
    },
    {
      ordem: 6,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Resumo' }
    },
    {
      ordem: 7,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Dados da defesa',
        descricao:
          'A solicitação deve ser encaminhada com antecedência mínima de 28 dias para a data da defesa; tempo necessário para análise, homologação e trâmites necessários a defesa. Pedidos enviados fora do prazo poderão não ser atendidos.'
      }
    },
    {
      ordem: 8,
      tipo: 'data',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Data',
        descricao:
          'Já combinada com a banca. Caso necessário, perguntar à secretaria se há disponibilidade do auditório do CEEI. Considerar apenas dias úteis (segunda a sexta) em acordo com o calendário da UFCG.'
      }
    },
    {
      ordem: 9,
      tipo: 'hora',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Horário',
        descricao:
          'Já combinado com a banca. Favor usar o padrão 24h; por exemplo, 14:00 ao invés de 02:00. Favor evitar horários após 9h no turno da manhã ou após 14h30 no turno da tarde. Considerar apenas horário comercial.'
      }
    },
    {
      ordem: 10,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Local',
        descricao:
          'Caso a defesa seja no auditório do CEEI, a secretaria leva a documentação. Caso seja em outro auditório, o orientador deve coletar a documentação com antecedência na Secretaria da COPIN.'
      }
    },
    {
      ordem: 11,
      tipo: 'ficheiro',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Comprovante de Reserva do Local para a Defesa',
        descricao:
          'Anexe aqui qualquer documento que confirme que o local da defesa está reservado no horário e data indicados e com o propósito da defesa. Pode ser: cópia de e-mail, printscreen de tela ou cópia de formulário de reserva.'
      }
    },
    {
      ordem: 12,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Membros Internos da Comissão Examinadora',
        descricao: 'Membros internos devem ser credenciados no PPGCC.'
      }
    },
    {
      ordem: 13,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Membro Interno 1' }
    },
    {
      ordem: 14,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Nome do membro interno 1',
        descricao:
          'Dissertações de mestrado precisam de ao menos um membro interno.'
      }
    },
    {
      ordem: 15,
      tipo: 'caixa_verificacao',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Informar que requisitos da Norma Complementar do PPGCC 001/2019 o membro interno 1 atende:',
        opcoes: [
          'Docente credenciado no PPGCC.',
          'Ter experiência na área do trabalho a ser defendido, comprovada através de publicações, orientações acadêmicas ou experiência profissional.'
        ]
      }
    },
    {
      ordem: 16,
      tipo: 'escolha_multipla',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Participação do membro interno 1',
        descricao:
          'Art 64. Res. 03/2016 UFCG: No máximo 01 membro (interno ou externo) da Banca Examinadora de Mestrado poderá participar por video-conferência.',
        opcoes: ['Presencial', 'Video-conferência'],
        outro: true
      }
    },
    {
      ordem: 17,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Membro Interno 2',
        descricao: '(caso exista)'
      }
    },
    {
      ordem: 18,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: { titulo: 'Nome do membro interno 2' }
    },
    {
      ordem: 19,
      tipo: 'caixa_verificacao',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Informar que requisitos da Norma Complementar do PPGCC 001/2019 o membro interno 2 atende:',
        opcoes: [
          'Docente credenciado no PPGCC.',
          'Ter experiência na área do trabalho a ser defendido, comprovada através de publicações, orientações acadêmicas ou experiência profissional.'
        ]
      }
    },
    {
      ordem: 20,
      tipo: 'escolha_multipla',
      obrigatorio: false,
      configuracao_campo: {
        titulo: 'Participação do membro interno 2',
        descricao:
          'Art 64. Res. 03/2016 UFCG: No máximo 01 membro (interno ou externo) da Banca Examinadora de Mestrado poderá participar por video-conferência.',
        opcoes: ['Presencial', 'Video-conferência'],
        outro: true
      }
    },
    {
      ordem: 21,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Membros externos da Comissão Examinadora',
        descricao:
          'Dissertações de mestrado precisam de ao menos um membro externo. Pelo menos um dos membros externos da comissão, o Membro Externo 1, deve ter experiência reconhecida na área comprovada por pelo menos um dos critérios definidos no item 3. (além do item 2) na Norma Regulamentar 001/2019. Casos excepcionais serão julgados pelo Colegiado mediante justificativa do professor(a) orientador(a).'
      }
    },
    {
      ordem: 22,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Membro Externo 1' }
    },
    {
      ordem: 23,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Nome do membro externo 1' }
    },
    {
      ordem: 24,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Instituição do membro externo 1' }
    },
    {
      ordem: 25,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: { titulo: 'Email do membro externo 1' }
    },
    {
      ordem: 26,
      tipo: 'resposta',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'URL do Currículo Lattes do membro externo 1',
        descricao: '(Ou URL para curriculum equivalente, caso estrangeiro)'
      }
    },
    {
      ordem: 27,
      tipo: 'escolha_multipla',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Participação do membro externo 1',
        descricao:
          'Art 64. Res. 03/2016 UFCG: No máximo 01 membro (interno ou externo) da Banca Examinadora de Mestrado poderá participar por video-conferência.',
        opcoes: ['Presencial', 'Video-conferência'],
        outro: true
      }
    },
    {
      ordem: 28,
      tipo: 'caixa_verificacao',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Informar que requisitos da Norma Complementar do PPGCC 001/2019 o membro externo 1 atende:',
        opcoes: [
          'Possuir Título de Doutor',
          'Ter experiência na área do trabalho a ser defendido, comprovada através de publicações, orientações acadêmicas ou experiência profissional.',
          'Ser Bolsista de Produtividade PQ ou DT do CNPq',
          'Ser qualificado, através de análise de seu curriculum, com o perfil de Pesquisador P1 ou P2 de acordo com Norma Complementar 003/2015 de 17 de Junho de 2015 do PPGCC/UFCG;',
          'Ter, no mínimo, 1 orientação de mestrado ou doutorado concluída nos últimos 4 anos.'
        ],
        outro: true
      }
    },
    {
      ordem: 29,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Caso tenha marcado a caixa "Ser qualificado, através de análise de seu curriculum, com o perfil de Pesquisador P1 ou P2 ..." para o membro externo 1, informar as publicações presentes no curriculum que devem ser consideradas para comprovação da qualificação:',
        descricao:
          'Use o seguinte formato (link para publicação, Qualis, peso da publicação para cálculo do IPD), para cada publicação, seguido do resultado do cálculo do IPD. Considere o IPD e o CDD definidos para o ano corrente, conforme publicado no link Normas e Regulamentos do site do PPGCC.'
      }
    },
    {
      ordem: 30,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Se o membro externo 1 se enquadra em um caso excepcional, justificar a participação deste membro por meio de experiências presentes no curriculum que devem ser consideradas para comprovação da qualificação:'
      }
    },
    {
      ordem: 31,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Informações para cadastro do membro externo 1 na Plataforma Sucupira',
        descricao:
          'Caso esta seja a primeira participação do membro externo 1 em bancas examinadoras do PPGCC, informar o CPF. Caso estrangeiro, informar: Data de Nascimento, Sexo, Nacionalidade e Titulação  (Nivel, Ano, Área de Conhecimento, País da Instituição e Instituição). O pedido de homologação será encaminhado apenas quando o membro externo 1 puder ser cadastrado na Plataforma Sucupira. Consulte neste link se um participante externo já possui cadastro ou entre em contato com a secretaria: https://docs.google.com/a/computacao.ufcg.edu.br/spreadsheets/d/1rsFBIGPVbF-T1yRonruWhsnRK-mLKaxqblRIiS4wUBc/edit?usp=sharing'
      }
    },
    {
      ordem: 32,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Membro Externo 2',
        descricao: '(caso exista)'
      }
    },
    {
      ordem: 33,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: { titulo: 'Nome do membro externo 2' }
    },
    {
      ordem: 34,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: { titulo: 'Instituição do membro externo 2' }
    },
    {
      ordem: 35,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: { titulo: 'Email do membro externo 2' }
    },
    {
      ordem: 36,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: {
        titulo: 'URL do Currículo Lattes do membro externo 2',
        descricao: '(Ou URL para curriculum equivalente, caso estrangeiro)'
      }
    },
    {
      ordem: 37,
      tipo: 'escolha_multipla',
      obrigatorio: false,
      configuracao_campo: {
        titulo: 'Participação do membro externo 1',
        descricao:
          'Art 64. Res. 03/2016 UFCG: No máximo 01 membro (interno ou externo) da Banca Examinadora de Mestrado poderá participar por video-conferência.',
        opcoes: ['Presencial', 'Video-conferência'],
        outro: true
      }
    },
    {
      ordem: 38,
      tipo: 'caixa_verificacao',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Informar que requisitos da Norma Complementar do PPGCC 001/2019 o membro externo 2 atende:',
        opcoes: [
          'Possuir Título de Doutor',
          'Ter experiência na área do trabalho a ser defendido, comprovada através de publicações, orientações acadêmicas ou experiência profissional.'
        ],
        outro: true
      }
    },
    {
      ordem: 39,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: {
        titulo:
          'Informações para cadastro do membro externo 2 na Plataforma Sucupira',
        descricao:
          'Caso esta seja a primeira participação do membro externo 2 em bancas examinadoras do PPGCC, informar o CPF. Caso estrangeiro, informar: Data de Nascimento, Sexo, Nacionalidade e Titulação. Em caso de dúvida, consulte a secretaria do PPGCC. O pedido de homologação será encaminhado apenas quando o membro externo 2 puder ser cadastrado na Plataforma Sucupira. Consulte neste link se um participante externo já possui cadastro ou entre em contato com a secretaria: https://docs.google.com/a/computacao.ufcg.edu.br/spreadsheets/d/1rsFBIGPVbF-T1yRonruWhsnRK-mLKaxqblRIiS4wUBc/edit?usp=sharing'
      }
    },
    {
      ordem: 40,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Presidência da Banca e Participação dos Orientadores',
        descricao:
          'O presidente da comissão deverá, obrigatoriamente, participar da defesa de forma presencial.'
      }
    },
    {
      ordem: 41,
      tipo: 'grelha_multipla',
      obrigatorio: false,
      configuracao_campo: {
        titulo: 'Indicar a forma de participação de cada orientador:',
        linhas: ['Orientador Principal', 'Orientador Secundário (se existir)'],
        colunas: ['Presencial', 'Video-conferencia']
      }
    },
    {
      ordem: 42,
      tipo: 'escolha_multipla',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Quem será o Presidente da Banca?',
        opcoes: [
          'Orientador Principal',
          'Orientador Secundário',
          'Examinador Interno 01',
          'Examinador Interno 02'
        ],
        outro: true
      }
    },
    {
      ordem: 43,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Declarações'
      }
    },
    {
      ordem: 44,
      tipo: 'caixa_verificacao',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Declaração do Orientador',
        opcoes: [
          '(Art. 43, Res. 22/2010 e Art. 51, Res. 04/2016) Declaro que concordo com a apresentação do trabalho e que revisei o documento a ser submetido pelo aluno com relação à autenticidade e suficiência técnico-científica.',
          'Estou ciente de que o PPGCC não garante o atendimento desta solicitação caso enviada fora do prazo ou com informações incompletas/incorretas.',
          'Estou ciente de que, após a homologação, qualquer modificação necessária a definição desta banca, incluindo modificações de horário e local, devem ser comunicadas com antecedência à secretaria e estará sujeita a avaliação e aprovação do Colegiado.',
          'Estou ciente de que sou responsável pela reserva do local de defesa/exame e que a reserva deve ser feita antes do envio desta solicitação.',
          'Declaro que as informações fornecidas nesta solicitação são verdadeiras e exatas.'
        ],
        outro: true
      }
    },
    {
      ordem: 45,
      tipo: 'paragrafo',
      obrigatorio: true,
      configuracao_campo: {
        titulo: 'Guarde o link para editar o Form',
        descricao:
          'Marque a opção: "Envie-me uma cópia das minhas respostas." para receber uma cópia de suas respostas e um link para edição, caso informações adicionais e/ou correções sejam solicitadas pelo Colegiado.'
      }
    }
  ]
}

const tipoProcesso: RemoteTipoProcesso = {
  nome: 'Solicitação de Homologação de Comissão Examinadora de Defesa de Dissertação de Mestrado',
  descricao:
    'Antes de preencher este formulário, é importante que o orientador verifique se a banca a ser definida atende a Norma PPGCC-01/19: Requisitos para Homologação de Bancas Examinadoras de Mestrado e Doutorado.',
  colegiado: true,
  escopo: 'privado',
  dataFim: '2050-10-07T19:28:15.203Z',
  dataInicio: '2000-10-07T19:28:15.203Z',
  formularios: [1]
}

export default { formulario, tipoProcesso }
