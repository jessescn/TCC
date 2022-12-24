import { Icon, Text, Tooltip } from '@chakra-ui/react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

type Props = {
  label: string
}

export const InfoIcon = ({ label }: Props) => {
  return (
    <Tooltip label={label}>
      <Text as="span" ml="0.25rem">
        <Icon boxSize={4} as={AiOutlineInfoCircle} />
      </Text>
    </Tooltip>
  )
}
