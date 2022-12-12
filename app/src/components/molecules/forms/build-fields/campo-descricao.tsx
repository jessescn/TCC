import { Text, Textarea } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { BaseBuildFieldProps } from '.'

export default function Descricao({ onUpdate, campo }: BaseBuildFieldProps) {
  const handleUpdate = debounce(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdate({
        ...campo,
        configuracao_campo: {
          ...campo.configuracao_campo,
          descricao: ev.target.value
        }
      })
    },
    400
  )

  return (
    <>
      <Text fontSize="12px" mb="8px" color="secondary.dark">
        Descrição
      </Text>
      <Textarea
        borderBottom="1px solid #BCBCBC"
        _focus={{ boxShadow: 'none' }}
        size="sm"
        onChange={handleUpdate}
        fontSize="14px"
        placeholder="Texto do parágrafo"
        defaultValue={campo.configuracao_campo?.descricao || ''}
      />
    </>
  )
}
