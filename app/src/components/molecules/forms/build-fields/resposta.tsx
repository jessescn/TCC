import { Input } from '@chakra-ui/react'
import { useState } from 'react'

export default function RespostaBuilder() {
  const [value, setValue] = useState()

  return (
    <Input
      border="none"
      borderBottom="1px solid #BCBCBC"
      placeholder="Texto de resposta curta"
      disabled
    />
  )
}
