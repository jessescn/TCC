import {
  Box,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import ConfirmModal from 'components/organisms/confirm-modal'
import lodash from 'lodash'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlineClear, AiOutlineImport } from 'react-icons/ai'
import { BiLayerPlus } from 'react-icons/bi'
import Campo, { CampoFormulario } from './campo'

type Props = {
  onDuplicate: () => void
}

export default function EditForm({ onDuplicate }: Props) {
  const { setValue, watch } = useFormContext()
  const controls = useDisclosure()

  const campos: CampoFormulario[] = watch('campos') || []

  const handleAddCampo = useCallback(() => {
    const ordem = new Date().valueOf()
    const novoCampo: CampoFormulario = {
      ordem,
      tipo: 'resposta',
      obrigatorio: false,
      configuracao_campo: {}
    }

    setValue('campos', [...campos, novoCampo])
  }, [campos, setValue])

  const handleClearAll = useCallback(() => {
    setValue('campos', [])
    controls.onClose()
  }, [campos, setValue])

  const handleDuplicate = useCallback(
    (campoOrdem: number) => {
      const index = campos.findIndex(campo => campo.ordem === campoOrdem)

      if (index === -1) return

      const ordem = new Date().valueOf()
      const campoCopy: CampoFormulario = lodash.cloneDeep({
        ...campos[index],
        ordem
      })

      const updatedCampos: CampoFormulario[] = lodash.cloneDeep([...campos])

      updatedCampos.splice(index, 0, campoCopy)

      setValue('campos', updatedCampos)
    },
    [campos, setValue]
  )

  const handleDelete = useCallback(
    (ordem: number) => {
      setValue(
        'campos',
        campos.filter(campo => campo.ordem !== ordem)
      )
    },
    [campos, setValue]
  )

  const handleUpdate = (campo: CampoFormulario) => {
    const camposCopy = [...campos]

    const idx = camposCopy.findIndex(el => el.ordem === campo.ordem)

    if (idx === -1) {
      return
    }

    camposCopy.splice(idx, 1, campo)

    setValue('campos', camposCopy)
  }

  return (
    <>
      <Box my="32px">
        <Stack spacing="24px">
          {campos.map(campo => (
            <Campo
              key={campo.ordem}
              campo={campo}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onUpdate={handleUpdate}
            />
          ))}
        </Stack>
      </Box>
      <Stack
        pos="fixed"
        w="50px"
        top="40%"
        right="calc(50vw - 650px)"
        border="2px solid"
        borderColor="primary.dark"
        borderRadius="8px"
        alignItems="center"
        p="2px"
        spacing="2px"
      >
        <Box border="1px" borderColor="primary.dark" borderRadius="8px">
          <Tooltip label="Adicionar Campo">
            <IconButton
              aria-label=""
              onClick={handleAddCampo}
              bgColor="primary.dark"
              color="initial.white"
              _hover={{ color: 'primary.dark', bgColor: 'initial.white' }}
              icon={<Icon as={BiLayerPlus} />}
            />
          </Tooltip>
        </Box>
        <Box border="1px" borderColor="primary.dark" borderRadius="8px">
          <Tooltip label="Duplicar Formulário">
            <IconButton
              aria-label=""
              onClick={onDuplicate}
              bgColor="primary.dark"
              color="initial.white"
              _hover={{ color: 'primary.dark', bgColor: 'initial.white' }}
              icon={<Icon as={AiOutlineImport} />}
            />
          </Tooltip>
        </Box>
        <Box border="1px" borderColor="primary.dark" borderRadius="8px">
          <Tooltip label="Limpar Tudo" aria-label="">
            <IconButton
              aria-label=""
              onClick={controls.onOpen}
              bgColor="primary.dark"
              color="initial.white"
              _hover={{ color: 'primary.dark', bgColor: 'initial.white' }}
              icon={<Icon as={AiOutlineClear} />}
              isDisabled={campos.length === 0}
            />
          </Tooltip>
        </Box>
      </Stack>
      <ConfirmModal
        {...controls}
        onCancelButtonText="cancelar"
        onConfirmButtonText="Apagar"
        onConfirm={handleClearAll}
        title="Apagar Todos"
        content="Deseja apagar todos os campos?"
      />
    </>
  )
}
