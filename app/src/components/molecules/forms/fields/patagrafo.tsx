import { Box, Text } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoParagrafo } from 'domain/types/campo-tipos'

type Props = CampoFormulario<CampoTipoParagrafo>

export function CampoParagrafo({ obrigatorio, configuracao_campo }: Props) {
  const { descricao, titulo } = configuracao_campo

  return (
    <Box>
      {titulo && (
        <Text fontWeight="bold" mb="8px">
          {titulo}
          <Text as="span" color="info.error" hidden={!obrigatorio}>
            *
          </Text>
        </Text>
      )}
      {descricao && <Text fontSize="12px">{descricao}</Text>}
    </Box>
  )
}
