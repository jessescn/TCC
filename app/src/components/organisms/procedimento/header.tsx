import { Flex, Text } from '@chakra-ui/react'
import { ProcedimentoStatus, statusList } from 'domain/models/procedimento'

type Props = {
  procedimentoId: number
  status: ProcedimentoStatus
}

const Header = ({ procedimentoId, status }: Props) => {
  const currentStatus = statusList[status]

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="24px" fontWeight="bold">
        Procedimento{' '}
        <Text as="span" fontSize="20px" color="secondary.dark">
          #{procedimentoId}
        </Text>
      </Text>
      <Text fontSize="20px" fontWeight="bold">
        Status:{' '}
        <Text
          ml="8px"
          as="span"
          textTransform="uppercase"
          color={currentStatus.color}
        >
          {currentStatus.label}
        </Text>
      </Text>
    </Flex>
  )
}

export default Header
