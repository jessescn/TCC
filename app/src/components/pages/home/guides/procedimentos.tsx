import { Stack, Text } from '@chakra-ui/react'
import { ProcedimentoStatus, statusList } from 'domain/models/procedimento'
import { BsCardChecklist } from 'react-icons/bs'
import InfoCard from '../info-card'

export default function ProcedimentosInfoCard() {
  return (
    <InfoCard title="Procedimentos" icon={BsCardChecklist}>
      <Stack spacing="0.4rem" fontSize="sm">
        <Text>
          No momento que o usuário preenche os dados necessários no
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Tipos de Procedimentos
          </Text>
          e clica em submeter, é criado um novo
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
        </Text>
      </Stack>
    </InfoCard>
  )
}
