import { Text } from '@chakra-ui/react'
import { ImInsertTemplate } from 'react-icons/im'
import InfoCard from '../info-card'

export default function FormulariosInfoCard() {
  return (
    <InfoCard icon={ImInsertTemplate} title="Formulários">
      <Text fontSize="sm">
        Os
        <Text mx="0.25rem" as="span" fontWeight="bold">
          Formulários
        </Text>
        são um conjunto de diferentes campos que devem ser preenchidos pelos
        usuários ao abrir um novo procedimento.
      </Text>
    </InfoCard>
  )
}
