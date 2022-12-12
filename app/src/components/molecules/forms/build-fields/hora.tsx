import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { BiTimeFive } from 'react-icons/bi'

export default function HoraBuilder() {
  return (
    <>
      <InputGroup width="fit-content" mt="16px">
        <Input
          border="none"
          type="time"
          borderBottom="1px solid #BCBCBC"
          disabled
        />
        <InputRightElement
          pointerEvents="none"
          children={<Icon as={BiTimeFive} opacity="0.5" />}
        />
      </InputGroup>
    </>
  )
}
