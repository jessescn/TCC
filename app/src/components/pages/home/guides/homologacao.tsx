import { Stack, Text } from '@chakra-ui/react'
import { MdApproval } from 'react-icons/md'
import InfoCard from '../info-card'

export default function HomologacaoInfoCard() {
  return (
    <InfoCard title="Homologação" icon={MdApproval}>
      <Stack spacing="0.4rem" fontSize="sm">
        <Text>
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Procedimentos
          </Text>
          com status EM HOMOLOGAÇÃO ficam disponíveis para serem votados pelos
          membros do colegiado. Uma vez que a votação atinge a maioria, o status
          do
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Procedimento
          </Text>
          é automaticamente alterado para DEFERIDO ou INDEFERIDO.
        </Text>
      </Stack>
    </InfoCard>
  )
}
