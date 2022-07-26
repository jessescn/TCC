import { Input } from '@chakra-ui/react'
import { BaseBuildFieldProps } from '.'

export default function RespostaBuilder({ onUpdate }: BaseBuildFieldProps) {
  return (
    <Input
      border="none"
      borderBottom="1px solid #BCBCBC"
      placeholder="Texto de resposta curta"
      disabled
    />
  )
}
