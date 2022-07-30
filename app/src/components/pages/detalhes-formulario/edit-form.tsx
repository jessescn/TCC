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
import { debounce } from 'lodash'
import CaixaVerificacaoBuilder from 'components/molecules/forms/build-fields/caixa-verificacao'
import DataBuilder from 'components/molecules/forms/build-fields/data'
import EscolhaMultiplaBuilder from 'components/molecules/forms/build-fields/escolha-multipla'
import FicheiroBuilder from 'components/molecules/forms/build-fields/ficheiro'
import GrelhaMultiplaBuilder from 'components/molecules/forms/build-fields/grelha-multipla'
import GrelhaVerificacaoBuilder from 'components/molecules/forms/build-fields/grelha-verificacao'
import HoraBuilder from 'components/molecules/forms/build-fields/hora'
import ParagrafoBuilder from 'components/molecules/forms/build-fields/paragrafo'
import RespostaBuilder from 'components/molecules/forms/build-fields/resposta'
import { TipoCampoFormulario } from 'domain/models/formulario'
import { CampoTipoBase } from 'domain/types/campo-tipos'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'

type CampoProps = {
  campo: CampoFormulario
  onDelete: (ordem: number) => void
  onUpdate: (campo: CampoFormulario) => void
}
const opcoesCampos = new Map([
  ['paragrafo', { label: 'Parágrafo', render: ParagrafoBuilder }],
  ['resposta', { label: 'Resposta', render: RespostaBuilder }],
  ['data', { label: 'Data', render: DataBuilder }],
  ['hora', { label: 'Hora', render: HoraBuilder }],
  ['ficheiro', { label: 'Ficheiro', render: FicheiroBuilder }],
  [
    'escolha_multipla',
    { label: 'Escolha Múltipla', render: EscolhaMultiplaBuilder }
  ],
  [
    'caixa_verificacao',
    { label: 'Caixa Verificacão', render: CaixaVerificacaoBuilder }
  ],
  [
    'grelha_multipla',
    { label: 'Grelha Múltipla', render: GrelhaMultiplaBuilder }
  ],
  [
    'grelha_verificacao',
    { label: 'Grelha Verificacão', render: GrelhaVerificacaoBuilder }
  ]
])

const Campo = ({ campo, onDelete, onUpdate }: CampoProps) => {
  // console.log('check infinity loop')
  const handleUpdateTitle = debounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({
        ...campo,
        configuracao_campo: {
          ...campo.configuracao_campo,
          titulo: ev.target.value
        }
      })
    },
    400
  )

  const Componente = opcoesCampos.get(campo.tipo)?.render

  return (
    <Box borderColor="secondary.dark" borderWidth="1px" borderRadius="4px">
      <Flex justifyContent="flex-end" py="8px" px="16px">
        <Flex alignItems="center">
          <Text mr="8px" fontSize="14px" color="initial.black">
            obrigatório
          </Text>
          <Switch
            defaultChecked={campo.obrigatorio}
            onChange={() =>
              onUpdate({ ...campo, obrigatorio: !campo.obrigatorio })
            }
          />
        </Flex>
      </Flex>
      <Stack direction="row" spacing="16px" my="8px" px="16px">
        {campo.tipo !== 'paragrafo' && (
          <Input
            placeholder="Pergunta"
            size="sm"
            defaultValue={campo.configuracao_campo.titulo}
            onChange={handleUpdateTitle}
          />
        )}
        <Select
          size="sm"
          ml="8px"
          defaultValue={campo.tipo}
          onChange={e =>
            onUpdate({
              ...campo,
              tipo: e.target.value as any,
              configuracao_campo: {}
            })
          }
        >
          {Array.from(opcoesCampos.keys()).map(opcaoKey => (
            <option key={opcaoKey} value={opcaoKey}>
              {opcoesCampos.get(opcaoKey)?.label}
            </option>
          ))}
        </Select>
      </Stack>
      {Componente && (
        <Box px="16px" my="16px">
          <Componente onUpdate={onUpdate} campo={campo} />
        </Box>
      )}
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

export type CampoFormulario = {
  ordem: number
  tipo: TipoCampoFormulario
  obrigatorio?: boolean
  configuracao_campo: CampoTipoBase
}

export default function EditForm() {
  const { setValue, watch } = useFormContext()

  const campos: CampoFormulario[] = watch('campos') || []

  const handleAddCampo = useCallback(() => {
    const ordem = new Date().valueOf()
    setValue('campos', [
      ...campos,
      { ordem, tipo: 'resposta', obrigatorio: false, configuracao_campo: {} }
    ])
  }, [])

  const handleDelete = useCallback((ordem: number) => {
    setValue(
      'campos',
      campos.filter(campo => campo.ordem !== ordem)
    )
  }, [])

  const handleUpdate = (campo: CampoFormulario) => {
    console.log(campo)

    const camposCopy = [...campos]

    const idx = camposCopy.findIndex(el => el.ordem === campo.ordem)

    if (idx === -1) {
      return
    }

    camposCopy.splice(idx, 1, campo)

    setValue('campos', camposCopy)
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
          onClick={handleAddCampo}
        >
          Adicionar Campo
        </Button>
      </Flex>
      <Stack spacing="24px">
        {campos.map(campo => (
          <Campo
            campo={campo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Stack>
    </Box>
  )
}
