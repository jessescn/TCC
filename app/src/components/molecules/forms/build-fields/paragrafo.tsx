import { Input } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { BaseBuildFieldProps } from '.'

export default function ParagrafoBuilder({
  onUpdate,
  campo
}: BaseBuildFieldProps) {
  const handleUpdate = debounce((ev: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...campo,
      configuracao_campo: {
        ...campo.configuracao_campo,
        titulo: ev.target.value
      }
    })
  }, 400)

  return (
    <Input
      ml="8px"
      border="none"
      borderBottom="1px solid #BCBCBC"
      _focus={{ boxShadow: 'none' }}
      size="sm"
      onChange={handleUpdate}
      fontSize="12px"
      placeholder="Texto do parágrafo"
      defaultValue={campo.configuracao_campo?.titulo || ''}
    />
  )
}
