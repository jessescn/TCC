import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Icon,
  IconButton,
  Input
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

export default function CaixaVerificacaoBuilder() {
  const [campos, setCampos] = useState(['Opcão 1'])

  function handleDelete(idx: number) {
    const filtered = [...campos]
    filtered.splice(idx, 1)
    setCampos(filtered)
  }

  function handleAdd() {
    setCampos([...campos, `Opcão ${campos.length + 1}`])
  }

  return (
    <CheckboxGroup>
      {campos.map((campo, idx) => (
        <Flex my="8px">
          <Checkbox isDisabled size="lg" key={`${campo}-${idx}`} />
          <Input
            ml="8px"
            border="none"
            borderBottom="1px solid #BCBCBC"
            _focus={{ boxShadow: 'none' }}
            size="sm"
            value={campo}
          />
          <IconButton
            aria-label=""
            size="sm"
            onClick={() => handleDelete(idx)}
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
          onClick={handleAdd}
          icon={<Icon as={AiOutlinePlus} />}
        />
      </Flex>
    </CheckboxGroup>
  )
}
