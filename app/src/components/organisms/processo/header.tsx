import { Flex, Text } from '@chakra-ui/react'
import { ProcessoStatus, statusList } from 'domain/models/processo'

type Props = {
  processoId: number
  status: ProcessoStatus
}

const Header = ({ processoId, status }: Props) => {
  const currentStatus = statusList[status]

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="24px" fontWeight="bold">
        Processo{' '}
        <Text as="span" fontSize="20px" color="secondary.dark">
          #{processoId}
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
