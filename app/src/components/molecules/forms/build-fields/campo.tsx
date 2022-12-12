import {
  Box,
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
import { opcoesCampos } from 'components/molecules/forms/build-fields'
import { TipoCampoFormulario } from 'domain/models/formulario'
import { CampoTipoBase } from 'domain/types/campo-tipos'
import { debounce } from 'lodash'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Descricao from './campo-descricao'

export type CampoFormulario = {
  ordem: number
  tipo: TipoCampoFormulario
  obrigatorio?: boolean
  configuracao_campo: CampoTipoBase
}

type Props = {
  campo: CampoFormulario
  onDelete: (ordem: number) => void
  onUpdate: (campo: CampoFormulario) => void
  onDuplicate: (ordem: number) => void
}

export default function Campo({
  campo,
  onDelete,
  onUpdate,
  onDuplicate
}: Props) {
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
      <Flex justifyContent="space-between" py="8px" px="16px">
        <Text mr="8px" fontSize="14px" color="initial.black">
          Campo ID:{' '}
          <Text as="span" fontWeight="bold">
            {campo.ordem}
          </Text>
        </Text>
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
      <Box p="16px">
        <Stack direction="row" spacing="16px" my="8px">
          <Box w="60%">
            <Text fontSize="12px" mb="8px" color="secondary.dark">
              Título
            </Text>
            <Input
              placeholder="Título do Campo"
              size="sm"
              defaultValue={campo.configuracao_campo.titulo || 'Título'}
              onChange={handleUpdateTitle}
            />
          </Box>
          <Box w="40%">
            <Text fontSize="12px" mb="8px" color="secondary.dark">
              Tipo Campo
            </Text>
            <Select
              size="sm"
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
          </Box>
        </Stack>
        <Descricao campo={campo} onUpdate={onUpdate} />
      </Box>
      {Componente && campo.tipo !== 'paragrafo' && (
        <Box px="16px" my="16px">
          <Text fontSize="12px" mb="8px" color="secondary.dark">
            Informações Campo
          </Text>
          <Componente onUpdate={onUpdate} campo={campo} />
        </Box>
      )}
      <Flex
        bgColor="secondary.default"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Flex p={2}>
          <Tooltip label="Remover campo">
            <IconButton
              mr="8px"
              size="sm"
              aria-label=""
              bgColor="primary.dark"
              _hover={{ bgColor: 'primary.default' }}
              onClick={() => onDelete(campo.ordem)}
              icon={<Icon as={RiDeleteBinLine} color="initial.white" />}
            />
          </Tooltip>
          <Tooltip label="Duplicar campo">
            <IconButton
              size="sm"
              aria-label=""
              bgColor="primary.dark"
              _hover={{ bgColor: 'primary.default' }}
              onClick={() => onDuplicate(campo.ordem)}
              icon={
                <Icon as={HiOutlineDocumentDuplicate} color="initial.white" />
              }
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  )
}