import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Tooltip
} from '@chakra-ui/react'
import CaixaVerificacaoBuilder from 'components/molecules/forms/build-fields/caixa-verificacao'
import EscolhaMultiplaBuilder from 'components/molecules/forms/build-fields/escolha-multipla'
import RespostaBuilder from 'components/molecules/forms/build-fields/resposta'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'

type CampoProps = {
  campo: TipoCampo
  onDelete: (ordem: number) => void
}

const Campo = ({ campo, onDelete }: CampoProps) => {
  const opcoesCampos = new Map([
    ['Parágrafo', { key: 'paragrafo', render: <CaixaVerificacaoBuilder /> }],
    ['Resposta', { key: 'paragrafo', render: <RespostaBuilder /> }],
    ['Data', { key: 'paragrafo', render: <CaixaVerificacaoBuilder /> }],
    ['Hora', { key: 'paragrafo', render: <CaixaVerificacaoBuilder /> }],
    ['Ficheiro', { key: 'paragrafo', render: <CaixaVerificacaoBuilder /> }],
    [
      'Escolha Múltipla',
      { key: 'paragrafo', render: <EscolhaMultiplaBuilder /> }
    ],
    [
      'Campo Verificacão',
      { key: 'paragrafo', render: <CaixaVerificacaoBuilder /> }
    ],
    [
      'Grelha Múltipla',
      { key: 'paragrafo', render: <CaixaVerificacaoBuilder /> }
    ],
    [
      'Grelha Verificacão',
      { key: 'paragrafo', render: <CaixaVerificacaoBuilder /> }
    ]
  ])

  const [content, setContent] = useState('Parágrafo')

  return (
    <Box borderColor="secondary.dark" borderWidth="1px" borderRadius="4px">
      <Flex justifyContent="flex-end" py="8px" px="16px">
        <Flex alignItems="center">
          <Text mr="8px" fontSize="14px" color="initial.black">
            obrigatório
          </Text>
          <Switch />
        </Flex>
      </Flex>
      <Stack direction="row" spacing="16px" my="8px" px="16px">
        <Input placeholder="Pergunta" size="sm" />
        <Select
          size="sm"
          ml="8px"
          onChange={e => setContent(e.target.value as any)}
        >
          {Array.from(opcoesCampos.keys()).map(opcaoKey => (
            <option key={opcoesCampos.get(opcaoKey)?.key} value={opcaoKey}>
              {opcaoKey}
            </option>
          ))}
        </Select>
      </Stack>
      <Box px="16px" my="16px">
        {opcoesCampos.get(content)?.render}
      </Box>
      <Flex
        bgColor="secondary.default"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Flex>
          <Tooltip label="Remover campo">
            <IconButton
              aria-label=""
              variant="unstyled"
              onClick={() => onDelete(campo.ordem)}
              icon={<Icon as={RiDeleteBinLine} />}
            />
          </Tooltip>
          <Tooltip label="Duplicar campo">
            <IconButton
              aria-label=""
              variant="unstyled"
              icon={<Icon as={HiOutlineDocumentDuplicate} />}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  )
}

type TipoCampo = {
  ordem: number
}

export default function EditForm() {
  const [campos, setCampos] = useState<TipoCampo[]>([])

  function addField() {
    setCampos([...campos, { ordem: campos.length + 1 }])
  }

  function handleDelete(ordem: number) {
    setCampos(prev => prev.filter(campo => campo.ordem !== ordem))
  }

  return (
    <Box>
      <Flex justifyContent="flex-end" my="8px">
        <Button
          bgColor="secondary.dark"
          color="initial.white"
          aria-label=""
          size="xs"
          leftIcon={<Icon as={AiOutlinePlus} />}
          onClick={addField}
        >
          Adicionar Campo
        </Button>
      </Flex>
      <Stack spacing="24px">
        {campos.map(campo => (
          <Campo campo={campo} onDelete={handleDelete} />
        ))}
      </Stack>
    </Box>
  )
}
