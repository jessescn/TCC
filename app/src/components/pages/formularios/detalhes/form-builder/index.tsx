import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import Campo, {
  CampoFormulario
} from 'components/molecules/forms/build-fields/campo'
import lodash from 'lodash'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { RiErrorWarningLine } from 'react-icons/ri'
import SideMenu from './side-menu'

type Props = {
  onDuplicate: () => void
}

export default function FormBuilder({ onDuplicate }: Props) {
  const { setValue, watch } = useFormContext()

  const campos: CampoFormulario[] = watch('campos') || []

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

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    const camposCopy: CampoFormulario[] = JSON.parse(JSON.stringify(campos))

    const campo = camposCopy[dragIndex]
    camposCopy.splice(dragIndex, 1)
    camposCopy.splice(hoverIndex, 0, campo)

    setValue('campos', camposCopy)
  }

  return (
    <>
      <Box my="1rem">
        <Flex alignItems="center" mb="1rem">
          <Icon as={RiErrorWarningLine} mr="0.5rem" />
          <Text fontSize="sm" fontWeight="bold">
            Segure e arraste os campos para alterar a ordem de exibição
          </Text>
        </Flex>
        <Stack spacing="1.5rem">
          {campos.map((campo, idx) => (
            <Campo
              key={campo.ordem}
              campo={campo}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onUpdate={handleUpdate}
              onMove={handleMove}
              index={idx}
            />
          ))}
        </Stack>
      </Box>
      <SideMenu onDuplicate={onDuplicate} />
    </>
  )
}
