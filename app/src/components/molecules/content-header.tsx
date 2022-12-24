import { Flex, Text } from '@chakra-ui/react'
import { formatDate } from 'utils/format'
import { NavigationBackButton } from './nav-back-button'

type Props = {
  title: string
  identifier?: number
  updatedAt?: string
}

export const ContentHeader = ({ title, identifier, updatedAt }: Props) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex>
        <NavigationBackButton />
        <Text fontWeight="bold" fontSize="2xl" color="primary.dark">
          {title}
          {identifier && (
            <Text as="span" ml="0.5rem" fontSize="lg" color="secondary.dark">
              Id: {identifier}
            </Text>
          )}
        </Text>
      </Flex>
      <Text>
        Ultima edição:{' '}
        <Text as="span" fontWeight="bold" fontSize="lg">
          {updatedAt ? formatDate(updatedAt) : '-'}
        </Text>
      </Text>
    </Flex>
  )
}
