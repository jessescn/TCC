import { Box, Stack } from '@chakra-ui/react'
import { campoComponente } from 'components/molecules/forms/fields'
import { FormularioModel } from 'domain/models/formulario'

type Props = {
  formulario: FormularioModel
}

export default function RenderFormulario({ formulario }: Props) {
  const handleUpdateResposta = (ordem: number, data: any) => {
    console.log(ordem, data)
  }

  return (
    <Stack spacing="16px">
      {formulario.campos.map(campo => {
        const Componente = campoComponente[campo.tipo]

        return (
          <Box
            key={campo.ordem}
            bgColor="initial.white"
            px="24px"
            py="32px"
            borderRadius="8px"
          >
            <Componente {...campo} onUpdateResposta={handleUpdateResposta} />
          </Box>
        )
      })}
    </Stack>
  )
}
