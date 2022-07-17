import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoResposta } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoResposta>

export function CampoResposta(props: Props) {
  const { register, ...paragrafoProps } = props

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Input
        variant="unstyled"
        placeholder="Resposta"
        borderBottom="1px solid #BCBCBC"
        borderRadius={0}
        {...register}
      />
    </Box>
  )
}
