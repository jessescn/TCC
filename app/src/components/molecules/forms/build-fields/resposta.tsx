import { Input } from '@chakra-ui/react'

export default function RespostaBuilder() {
  return (
    <Input
      border="none"
      fontSize="14px"
      borderBottom="1px solid #BCBCBC"
      placeholder="Texto de resposta curta"
      disabled
    />
  )
}
