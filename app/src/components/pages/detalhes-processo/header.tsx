import { Flex, Text } from '@chakra-ui/react'

type Props = {
  processoId: number
  status: string
}

const Header = ({ processoId, status }: Props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="24px" fontWeight="bold">
        Processo{' '}
        <Text as="span" fontSize="20px" color="secondary.dark">
          ID: {processoId}
        </Text>
      </Text>
      <Text fontSize="20px" fontWeight="bold">
        Status:{' '}
        <Text ml="8px" as="span" textTransform="uppercase" color="info.warning">
          {status}
        </Text>
      </Text>
    </Flex>
  )
}

export default Header
