import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  IconButton,
  Input
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { BaseBuildFieldProps } from '.'

export default function CaixaVerificacaoBuilder({
  onUpdate,
  campo
}: BaseBuildFieldProps) {
  const initialValue: string[] = campo.configuracao_campo?.opcoes || ['Opcão 1']
  const [caixas, setCaixas] = useState(initialValue)

  function handleDeleteCaixa(idx: number) {
    const filtered = [...caixas]
    filtered.splice(idx, 1)
    setCaixas(filtered)
  }

  function handleAddCaixa() {
    setCaixas([...caixas, `Opcão ${caixas.length + 1}`])
  }

  const handleUpdateCaixa = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>, idx: number) => {
      const filtered = [...caixas]
      filtered.splice(idx, 1, ev.target.value)
      setCaixas(filtered)
    },
    400
  )

  useEffect(() => {
    onUpdate({
      ...campo,
      configuracao_campo: { ...campo.configuracao_campo, opcoes: caixas }
    })
  }, [caixas])

  return (
    <CheckboxGroup>
      {caixas.map((campo, idx) => (
        <Flex my="8px" key={`${campo}-${idx}`}>
          <Checkbox isDisabled size="lg" key={`${campo}-${idx}`} />
          <Input
            ml="8px"
            border="none"
            borderBottom="1px solid #BCBCBC"
            _focus={{ boxShadow: 'none' }}
            size="sm"
            onChange={ev => handleUpdateCaixa(ev, idx)}
            defaultValue={campo}
          />
          <IconButton
            aria-label=""
            size="sm"
            onClick={() => handleDeleteCaixa(idx)}
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
          onClick={handleAddCaixa}
          icon={<Icon as={AiOutlinePlus} />}
        />
      </Flex>
    </CheckboxGroup>
  )
}
