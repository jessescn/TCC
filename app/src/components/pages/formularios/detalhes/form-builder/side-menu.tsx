import {
  Box,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import ConfirmModal from 'components/organisms/confirm-modal'
import { CampoFormulario } from 'domain/models/formulario'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlineClear, AiOutlineImport } from 'react-icons/ai'
import { BiLayerPlus } from 'react-icons/bi'

type Props = {
  onDuplicate: () => void
}

export default function SideMenu({ onDuplicate }: Props) {
  const { setValue, watch } = useFormContext()
  const controls = useDisclosure()

  const campos: CampoFormulario[] = watch('campos') || []

  const handleAddCampo = useCallback(() => {
    const novoCampo: CampoFormulario = {
      ordem: new Date().valueOf(),
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

  return (
    <>
      <Stack
        p="2px"
        w="50px"
        top="40%"
        pos="fixed"
        spacing="2px"
        right="calc(50vw - 660px)"
        border="2px solid"
        borderColor="primary.dark"
        borderRadius="lg"
        alignItems="center"
      >
        <Box border="1px" borderColor="primary.dark" borderRadius="lg">
          <Tooltip label="Adicionar Campo">
            <IconButton
              aria-label="botão adicionar campo"
              onClick={handleAddCampo}
              bgColor="primary.dark"
              color="initial.white"
              _hover={{ color: 'primary.dark', bgColor: 'initial.white' }}
              icon={<Icon as={BiLayerPlus} />}
            />
          </Tooltip>
        </Box>
        <Box border="1px" borderColor="primary.dark" borderRadius="lg">
          <Tooltip label="Duplicar Formulário">
            <IconButton
              aria-label="botão duplicar formulário"
              onClick={onDuplicate}
              bgColor="primary.dark"
              color="initial.white"
              _hover={{ color: 'primary.dark', bgColor: 'initial.white' }}
              icon={<Icon as={AiOutlineImport} />}
            />
          </Tooltip>
        </Box>
        <Box border="1px" borderColor="primary.dark" borderRadius="lg">
          <Tooltip label="Limpar Tudo">
            <IconButton
              aria-label="botão limpar campos"
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
