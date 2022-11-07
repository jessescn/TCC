import { Box, Button, Flex, Icon, Stack } from '@chakra-ui/react'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import lodash from 'lodash'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlineClear, AiOutlinePlus } from 'react-icons/ai'
import Campo, { CampoFormulario } from './campo'

export default function EditForm() {
  const { setValue, watch } = useFormContext()

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
      <Box>
        <Flex justifyContent="space-between" my="8px">
          <SimpleConfirmationButton
            onCancelButtonText="cancelar"
            onConfirmButtonText="Apagar"
            onConfirm={handleClearAll}
            title="Apagar Todos"
            content="Deseja apagar todos os campos?"
            style={{
              bgColor: 'primary.dark',
              _hover: { bgColor: 'primary.default' },
              color: 'initial.white',
              'aria-label': '',
              size: 'xs',
              leftIcon: <Icon as={AiOutlineClear} />,
              disabled: campos.length === 0
            }}
          >
            Limpar tudo
          </SimpleConfirmationButton>
          <Button
            bgColor="primary.dark"
            _hover={{ bgColor: 'primary.default' }}
            color="initial.white"
            aria-label=""
            size="xs"
            leftIcon={<Icon as={AiOutlinePlus} />}
            onClick={handleAddCampo}
            ml="8px"
          >
            Adicionar Campo
          </Button>
        </Flex>
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
    </>
  )
}
