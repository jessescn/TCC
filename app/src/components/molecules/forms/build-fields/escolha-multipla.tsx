import {
  Flex,
  Icon,
  IconButton,
  Input,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { BaseBuildFieldProps } from '.'

export default function EscolhaMultiplaBuilder({
  campo,
  onUpdate
}: BaseBuildFieldProps) {
  const initialValue: string[] = campo.configuracao_campo?.opcoes || ['Opcão 1']
  const [opcoes, setOpcoes] = useState(initialValue)

  function handleDeleteOpcao(idx: number) {
    const filtered = [...opcoes]
    filtered.splice(idx, 1)
    setOpcoes(filtered)
  }

  function handleAddOpcao() {
    setOpcoes([...opcoes, `Opcão ${opcoes.length + 1}`])
  }

  const handleUpdateOpcao = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>, idx: number) => {
      const filtered = [...opcoes]
      filtered.splice(idx, 1, ev.target.value)
      setOpcoes(filtered)
    },
    2000
  )

  useEffect(() => {
    onUpdate({
      ...campo,
      configuracao_campo: { ...campo.configuracao_campo, opcoes: opcoes }
    })
  }, [opcoes])

  return (
    <RadioGroup>
      {opcoes.map((campo, idx) => (
        <Flex my="8px" key={`${campo}-${idx}`}>
          <Radio isDisabled size="lg" key={`${campo}-${idx}`} />
          <Input
            ml="8px"
            border="none"
            borderBottom="1px solid #BCBCBC"
            _focus={{ boxShadow: 'none' }}
            size="sm"
            defaultValue={campo}
            onChange={ev => handleUpdateOpcao(ev, idx)}
          />
          <IconButton
            aria-label=""
            size="sm"
            onClick={() => handleDeleteOpcao(idx)}
            bgColor="transparent"
            icon={<Icon as={AiOutlineClose} />}
          />
        </Flex>
      ))}
      <Flex>
        <IconButton
          w="100%"
          aria-label=""
          mt="8px"
          size="sm"
          onClick={handleAddOpcao}
          icon={<Icon as={AiOutlinePlus} />}
        />
      </Flex>
    </RadioGroup>
  )
}
