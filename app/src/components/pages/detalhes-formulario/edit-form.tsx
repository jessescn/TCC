import { Box, Button, Flex, Icon, Stack } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { AiOutlinePlus } from 'react-icons/ai'
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
