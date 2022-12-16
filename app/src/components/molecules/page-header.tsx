import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { formatDate } from 'utils/format'
import { NavigationBackButton } from './nav-back-button'

type Props = {
  title: string
  identifier?: number
  updatedAt?: string
}

export default function PageHeader({ title, identifier, updatedAt }: Props) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex>
        <NavigationBackButton />
        <Text fontWeight="bold" fontSize="24px" color="primary.dark">
          {title}
          {identifier && (
            <Text as="span" ml="8px" fontSize="18px" color="secondary.dark">
              ID: {identifier}
            </Text>
          )}
        </Text>
      </Flex>
      <Text>
        Ultima edição:{' '}
        <Text as="span" fontWeight="bold" fontSize="20px">
          {updatedAt ? formatDate(updatedAt) : '-'}
        </Text>
      </Text>
    </Flex>
  )
}
