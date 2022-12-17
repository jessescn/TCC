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
import { useRef } from 'react'
import type { XYCoord, Identifier } from 'dnd-core'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Descricao from './campo-descricao'
import { useDrag, useDrop } from 'react-dnd'

export type CampoFormulario = {
  ordem: number
  tipo: TipoCampoFormulario
  obrigatorio?: boolean
  configuracao_campo: CampoTipoBase
}

type Props = {
  campo: CampoFormulario
  index: number
  onDelete: (ordem: number) => void
  onUpdate: (campo: CampoFormulario) => void
  onDuplicate: (ordem: number) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
}

const ItemTypes = {
  CAMPO: 'campo'
}

interface DragItem {
  index: number
  id: string
  type: string
}

export default function Campo({
  campo,
  onDelete,
  onUpdate,
  onDuplicate,
  onMove,
  index
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CAMPO,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

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

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CAMPO,
    item: () => {
      return { index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <Box
      ref={ref}
      borderColor="secondary.dark"
      borderWidth="1px"
      borderRadius="4px"
      opacity={opacity}
      data-handler-id={handlerId}
    >
      <Flex justifyContent="space-between" py="8px" px="16px">
        <Flex>
          <Text mr="8px" fontSize="14px" color="initial.black">
            Campo ID:{' '}
            <Text as="span" fontWeight="bold">
              {campo.ordem}
            </Text>
          </Text>
        </Flex>
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
                  configuracao_campo: {
                    titulo: campo.configuracao_campo.titulo,
                    descricao: campo.configuracao_campo.descricao
                  }
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
        p={2}
      >
        <Flex>
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
