import { Input } from '@chakra-ui/react'
import { BaseBuildFieldProps } from '.'

export default function ParagrafoBuilder({
  onUpdate,
  campo
}: BaseBuildFieldProps) {
  return (
    <Input
      ml="8px"
      border="none"
      borderBottom="1px solid #BCBCBC"
      _focus={{ boxShadow: 'none' }}
      size="sm"
      onChange={ev =>
        onUpdate({
          ...campo,
          configuracao_campo: {
            ...campo.configuracao_campo,
            titulo: ev.target.value
          }
        })
      } // TODO: jogar em uma funcao e colocar debounce
      fontSize="12px"
      placeholder="Texto do parágrafo"
      value={campo.configuracao_campo?.titulo || ''}
    />
  )
}
