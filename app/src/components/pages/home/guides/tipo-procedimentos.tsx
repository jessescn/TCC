import { Stack, Text } from '@chakra-ui/react'
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
          É possível controlar a disponibilidade dos
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Tipos de Procedimentos
          </Text>
          através de prazos, status e públicos de usuários.
        </Text>
      </Stack>
    </InfoCard>
  )
}
