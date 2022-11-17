import {
  Flex,
  Icon,
  IconButton,
  Input,
  ListItem,
  OrderedList,
  Radio,
  Stack,
  Text
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { BaseBuildFieldProps } from '.'

export default function GrelhaMultiplaBuilder({
  campo,
  onUpdate
}: BaseBuildFieldProps) {
  const [opcoes, setOpcoes] = useState({
    linhas: campo.configuracao_campo?.opcoes.linhas || ['Linha 1'],
    colunas: campo.configuracao_campo?.opcoes.colunas || ['Coluna 1']
  })

  const handleUpdateColuna = debounce((idx: number, newValue?: string) => {
    const colunasCopy = JSON.parse(JSON.stringify(opcoes.colunas)) as string[]

    if (newValue) {
      colunasCopy.splice(idx, 1, newValue)
    } else {
      colunasCopy.splice(idx, 1)
    }

    setOpcoes(prev => ({ ...prev, colunas: colunasCopy }))
  }, 400)

  const handleUpdateLinha = debounce((idx: number, newValue?: string) => {
    const linhasCopy = JSON.parse(JSON.stringify(opcoes.linhas)) as string[]

    if (newValue) {
      linhasCopy.splice(idx, 1, newValue)
    } else {
      linhasCopy.splice(idx, 1)
    }

    setOpcoes(prev => ({ ...prev, linhas: linhasCopy }))
  }, 400)

  useEffect(() => {
    onUpdate({
      ...campo,
      configuracao_campo: { ...campo.configuracao_campo, opcoes }
    })
  }, [opcoes])

  function handleAddNewElement(where: 'linha' | 'coluna', newElm?: string) {
    const currentIdx =
      where === 'coluna' ? opcoes.colunas.length + 1 : opcoes.linhas.length + 1

    if (where === 'coluna') {
      const novaColuna = newElm ?? `Coluna ${currentIdx}`
      setOpcoes(prev => ({ ...prev, colunas: [...prev.colunas, novaColuna] }))
      return
    }

    const novaLinha = newElm ?? `Linha ${currentIdx}`
    setOpcoes(prev => ({ ...prev, linhas: [...prev.linhas, novaLinha] }))
  }

  return (
    <Flex>
      <Stack spacing="16px" w="50%" pr="8px">
        <Flex alignItems="center">
          <Text fontWeight="bold" fontSize="14px">
            Linhas
          </Text>
          <IconButton
            ml="8px"
            size="xs"
            aria-label=""
            onClick={() => handleAddNewElement('linha')}
            icon={<Icon as={AiOutlinePlus} />}
          />
        </Flex>
        <OrderedList pl="16px">
          {opcoes.linhas.map((linha: string, idx: number) => (
            <ListItem
              height="40px"
              mb="16px"
              key={`linha-${idx}-${linha}`}
              fontSize="14px"
            >
              <Flex alignItems="center" justifyContent="space-between">
                <Input
                  ml="8px"
                  border="none"
                  borderBottom="1px solid #BCBCBC"
                  _focus={{ boxShadow: 'none' }}
                  size="sm"
                  onChange={ev => handleUpdateLinha(idx, ev.target.value)}
                  value={linha}
                />
                {opcoes.linhas.length > 1 && (
                  <IconButton
                    aria-label=""
                    size="sm"
                    onClick={() => handleUpdateLinha(idx)}
                    bgColor="transparent"
                    icon={<Icon as={AiOutlineClose} />}
                  />
                )}
              </Flex>
            </ListItem>
          ))}
        </OrderedList>
      </Stack>
      <Stack spacing="16px" w="50%">
        <Flex alignItems="center">
          <Text fontWeight="bold" fontSize="14px">
            Colunas
          </Text>
          <IconButton
            ml="8px"
            size="xs"
            aria-label=""
            onClick={() => handleAddNewElement('coluna')}
            icon={<Icon as={AiOutlinePlus} />}
          />
        </Flex>
        {opcoes.colunas.map((coluna: string, idx: number) => (
          <Flex mb="16px" height="40px" key={`${coluna}-${idx}`}>
            <Radio isDisabled size="lg" />
            <Input
              ml="8px"
              border="none"
              borderBottom="1px solid #BCBCBC"
              _focus={{ boxShadow: 'none' }}
              size="sm"
              value={coluna}
              onChange={ev => handleUpdateColuna(idx, ev.target.value)}
            />
            {opcoes.colunas.length > 1 && (
              <IconButton
                aria-label=""
                size="sm"
                onClick={() => handleUpdateColuna(idx)}
                bgColor="transparent"
                icon={<Icon as={AiOutlineClose} />}
              />
            )}
          </Flex>
        ))}
      </Stack>
    </Flex>
  )
}
