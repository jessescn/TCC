import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { BiTimeFive } from 'react-icons/bi'
import { BaseBuildFieldProps } from '.'

export default function HoraBuilder({ onUpdate }: BaseBuildFieldProps) {
  return (
    <InputGroup width="fit-content">
      <Input
        border="none"
        type="time"
        borderBottom="1px solid #BCBCBC"
        placeholder="Texto de resposta curta"
        disabled
      />
      <InputRightElement
        pointerEvents="none"
        children={<Icon as={BiTimeFive} opacity="0.5" />}
      />
    </InputGroup>
  )
}
