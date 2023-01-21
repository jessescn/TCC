import { Box, Stack, Text } from '@chakra-ui/react'
import { ProcedimentoStatus, statusList } from 'domain/models/procedimento'
import { BsCardChecklist } from 'react-icons/bs'
import InfoCard from '../info-card'

export default function ProcedimentosInfoCard() {
  return (
    <InfoCard title="Procedimentos" icon={BsCardChecklist}>
      <Stack spacing="0.4rem" fontSize="sm">
        <Text>
          No momento que o usuário seleciona uma opção na aba 'Abrir
          Procedimento', preenche os dados necessários nos formulários e clica
          em submeter, é criado um novo
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Procedimento.
          </Text>
        </Text>
        <Text>
          Cada
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Procedimento
          </Text>
          possui um status vinculado, sendo eles:
          {Object.keys(statusList).map(status => (
            <Text
              textTransform="uppercase"
              color={statusList[status as ProcedimentoStatus].color}
              mx="0.25rem"
              as="span"
              fontWeight="bold"
            >
              {statusList[status as ProcedimentoStatus].label}.
            </Text>
          ))}
          Cada alteração de status é notificada ao autor do Procedimento através
          do email.
        </Text>
        <Box>
          <Text my="1rem" color={statusList.criado.color} fontWeight="bold">
            CRIADO
          </Text>
          <Text>
            No momento que o Procedimento é criado, é adicionado o status
            CRIADO.
          </Text>
        </Box>
        <Box>
          <Text my="1rem" color={statusList.em_analise.color} fontWeight="bold">
            EM ANÁLISE
          </Text>
          <Text>
            Alguns Procedimentos precisam ter suas respostas análisadas pela
            coordenação antes que possa dar continuidade para as outras etapas.
            Nessa etapa o coordenador ou algum outro membro da coordenação irá
            validar manualmente cada resposta e verificar é necessário algum
            ajuste.
          </Text>
        </Box>
        <Box>
          <Text
            my="1rem"
            color={statusList.correcoes_pendentes.color}
            fontWeight="bold"
          >
            CORREÇÕES PENDENTES
          </Text>
          <Text>
            Caso tenha sido identificada alguma inconsistência nas respostas do
            Procedimento, será requisitado que usuário edite o Procedimento,
            ajustando os campos inválidos apontados na revisão.
          </Text>
          <Text>
            Nessa etapa o usuário pode acessar sua aba de 'Meus Procedimentos',
            selecionar o Procedimento com status 'correções pendentes', editar
            suas respostas e clicar em submeter novamente.
          </Text>
        </Box>
        <Box>
          <Text
            my="1rem"
            color={statusList.em_homologacao.color}
            fontWeight="bold"
          >
            EM HOMOLOGAÇÃO
          </Text>
          <Text>
            Alguns Procedimentos precisam ser votados pelos membros do
            Colegiado. Enquanto estão aguardando a votação ser finalizada, os
            Procedimentos permanecem no status 'Em homologação'.
          </Text>
        </Box>
        <Box>
          <Text my="1rem" color={statusList.indeferido.color} fontWeight="bold">
            INDEFERIDO
          </Text>
          <Text>
            Caso o Procedimento tenha sido votado pelo Colegiado mas não obteve
            a maioria dos votos positivos, o seu status passa a ser
            'indeferido'.
          </Text>
        </Box>
        <Box>
          <Text my="1rem" color={statusList.deferido.color} fontWeight="bold">
            DEFERIDO
          </Text>
          <Text>
            Caso o Procedimento tenha sido votado pelo Colegiado e obteve a
            maioria dos votos positivos, o seu status passa a ser 'deferido' e
            fica disponível para ser encaminhado a secretaria.
          </Text>
        </Box>
        <Box>
          <Text
            my="1rem"
            color={statusList.encaminhado.color}
            fontWeight="bold"
          >
            ENCAMINHADO
          </Text>
          <Text>
            No momento que a coordenação realiza o encaminhamento do
            Procedimento para a secretaria, o status passa a ser 'encaminhado'.
            A partir dai, as próximas etapas envolvendo o Procedimento são
            realizadas fora do sistema.
          </Text>
        </Box>
      </Stack>
    </InfoCard>
  )
}
