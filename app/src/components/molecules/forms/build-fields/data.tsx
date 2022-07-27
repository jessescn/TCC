import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { BsCalendarDate } from 'react-icons/bs'
import { BaseBuildFieldProps } from '.'

export default function DataBuilder({ onUpdate }: BaseBuildFieldProps) {
  return (
    <InputGroup width="fit-content">
      <Input
        border="none"
        type="date"
        borderBottom="1px solid #BCBCBC"
        placeholder="Texto de resposta curta"
        disabled
      />
      <InputRightElement
        pointerEvents="none"
        children={<Icon as={BsCalendarDate} />}
      />
    </InputGroup>
  )
}
