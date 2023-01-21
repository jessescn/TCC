import { Box, Stack, Text } from '@chakra-ui/react'
import { HiTemplate } from 'react-icons/hi'
import InfoCard from '../info-card'

export default function TipoProcedimentosInfoCard() {
  return (
    <InfoCard icon={HiTemplate} title="Tipos de Procedimentos">
      <Stack spacing="0.4rem" fontSize="sm">
        <Text>
          Os
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Tipos de Procedimentos
          </Text>
          são modalidades de processos que podem ser abertos pelos usuários. Ao
          criar um novo tipo, é necessário associar um ou mais
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Formulários
          </Text>
          que vão ser preenchidos.
        </Text>
        <Text>
          É possível controlar a disponibilidade dos Tipos de Procedimentos
          através de prazos, status e públicos de usuários.
        </Text>
        <Box>
          <Text my="1rem" fontWeight="bold">
            Prazo
          </Text>
          <Text>
            Os valores de data início e data fim são utilizados para definir o
            prazo em que o Tipo de Procedimento ficará disponível.
          </Text>
        </Box>

        <Box>
          <Text my="1rem" fontWeight="bold">
            Públicos
          </Text>
          <Text>
            Os públicos definem o escopo de acesso daquele Tipo de Procedimento,
            ao adicionar uma lista de públicos, apenas os usuários com ao menos
            um dos públicos vínculado podem preencher o Tipo de Procedimento.
            Uma lista vazia de públicos permite que todos os usuários preencham.
          </Text>
        </Box>
        <Box>
          <Text my="1rem" fontWeight="bold">
            Revisão Coordenação
          </Text>
          <Text>
            Ao definir o campo 'revisão da coordenação' como 'Sim', todos os
            Procedimentos terão que ser revisados pela coordenação logo após
            serem criados. Caso seja encontrado alguma inconsistência na
            resposta, a coordenação pode pedir alterações na respostas do
            usuário e o status do Procedimento passa a ser CORREÇÕES PENDENTES.
          </Text>
        </Box>
        <Box>
          <Text my="1rem" fontWeight="bold">
            Aprovação Colegiado
          </Text>
          <Text>
            Ao definir o campo 'aprovação colegiado' como 'Sim', todos os
            Procedimentos terão que ser votados pelos membros do Colegiado. Uma
            vez que a maioria dos votos é atingida, o status do Procedimento
            passa a ser DEFERIDO caso tenha sido aprovado ou INDEFERIDO caso
            contrário.
          </Text>
        </Box>
      </Stack>
    </InfoCard>
  )
}
