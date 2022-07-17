import { Box, Stack } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import { CampoCaixaVerificacao } from 'components/molecules/forms/fields/caixa-verificacao'
import { CampoData } from 'components/molecules/forms/fields/data'
import { CampoEscolhaMultipla } from 'components/molecules/forms/fields/escolha-multipla'
import { CampoFicheiro } from 'components/molecules/forms/fields/ficheiro'
import { CampoGrelhaMultipla } from 'components/molecules/forms/fields/grelha-multipla'
import { CampoGrelhaVerificacao } from 'components/molecules/forms/fields/grelha-verificacao'
import { CampoHora } from 'components/molecules/forms/fields/hora'
import { CampoParagrafo } from 'components/molecules/forms/fields/patagrafo'
import { CampoResposta } from 'components/molecules/forms/fields/resposta'

export default function Home() {
  return (
    <Screen py="24px" height="fit-content">
      <Box
        w="100%"
        h="100%"
        maxW="1392px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <Box>
          <Stack spacing="24px" maxW="600px">
            <CampoParagrafo
              ordem={0}
              tipo="paragrafo"
              configuracao_campo={{ titulo: 'Dados do candidato' }}
            />
            <CampoResposta
              ordem={1}
              obrigatorio
              tipo="resposta"
              configuracao_campo={{
                titulo: 'Dados da defesa',
                descricao:
                  'A solicitação deve ser encaminhada com antecedência mínima de 28 dias para a data da defesa; tempo necessário para análise, homologação e trâmites necessários a defesa. Pedidos enviados fora do prazo poderão não ser atendidos. '
              }}
            />
            <CampoData
              ordem={1}
              obrigatorio
              tipo="data"
              configuracao_campo={{
                titulo: 'Data',
                descricao:
                  'Já combinada com a banca. Caso necessário, perguntar à secretaria se há disponibilidade do auditório do CEEI. Considerar apenas dias úteis (segunda a sexta) em acordo com o calendário da UFCG.'
              }}
            />
            <CampoHora
              ordem={1}
              obrigatorio
              tipo="hora"
              configuracao_campo={{
                titulo: 'Horário',
                descricao:
                  'Já combinado com a banca. Favor usar o padrão 24h; por exemplo, 14:00 ao invés de 02:00. Favor evitar horários após 9h no turno da manhã ou após 14h30 no turno da tarde. Considerar apenas horário comercial.'
              }}
            />
            <CampoFicheiro
              ordem={1}
              obrigatorio
              tipo="ficheiro"
              configuracao_campo={{
                quantidade_arquivos: 2,
                tamanho_maximo: 10,
                titulo: 'Comprovante de Reserva do Local para a Defesa',
                descricao:
                  'Anexe aqui qualquer documento que confirme que o local da defesa está reservado no horário e data indicados e com o propósito da defesa. Pode ser: cópia de e-mail, printscreen de tela ou cópia de formulário de reserva.'
              }}
            />
            <CampoEscolhaMultipla
              ordem={1}
              obrigatorio
              tipo="escolha_multipla"
              configuracao_campo={{
                opcoes: [
                  'Docente credenciado no PPGCC',
                  'Ter experiência na área do trabalho a ser defendido, comprovada através de publicações, orientações acadêmicas ou experiência profissional.'
                ],
                outro: true,
                titulo: 'Comprovante de Reserva do Local para a Defesa',
                descricao:
                  'Anexe aqui qualquer documento que confirme que o local da defesa está reservado no horário e data indicados e com o propósito da defesa. Pode ser: cópia de e-mail, printscreen de tela ou cópia de formulário de reserva.'
              }}
            />
            <CampoCaixaVerificacao
              ordem={1}
              tipo="caixa_verificacao"
              configuracao_campo={{
                opcoes: [
                  'Possuir Título de Doutor',
                  'Ter experiência na área do trabalho a ser defendido, comprovada através de publicações, orientações acadêmicas ou experiência profissional.'
                ],
                outro: false,
                titulo:
                  'Informar que requisitos da Norma Complementar do PPGCC 001/2019 o membro externo 2 atende:'
              }}
            />
            <CampoGrelhaMultipla
              ordem={1}
              tipo="grelha_multipla"
              configuracao_campo={{
                linhas: [
                  'Orientador Principal',
                  'Orientador Secundário (se existir)'
                ],
                colunas: ['Presencial', 'Video-conferencia'],
                titulo:
                  'Informar que requisitos da Norma Complementar do PPGCC 001/2019 o membro externo 2 atende:'
              }}
            />
            <CampoGrelhaVerificacao
              ordem={1}
              tipo="grelha_verificacao"
              configuracao_campo={{
                linhas: [
                  'Orientador Principal',
                  'Orientador Secundário (se existir)'
                ],
                colunas: ['Presencial', 'Video-conferencia'],
                titulo:
                  'Informar que requisitos da Norma Complementar do PPGCC 001/2019 o membro externo 2 atende:'
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Screen>
  )
}
