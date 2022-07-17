import { Box, Stack } from '@chakra-ui/react'
import { campoComponente } from 'components/molecules/forms/fields'
import { FormularioModel } from 'domain/models/formulario'

type Props = {
  formulario: FormularioModel
}

export default function RenderFormulario({ formulario }: Props) {
  const { campos } = formulario

  return (
    <Stack spacing="16px" overflowY="auto">
      {campos.map(campo => {
        const Componente = campoComponente[campo.tipo]

        return (
          <Box bgColor="initial.white" px="24px" py="32px" borderRadius="8px">
            <Componente {...campo} />
          </Box>
        )
      })}
    </Stack>
  )
}
