import { Box, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoHora } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoHora>

export function CampoHora(props: Props) {
  const { register, ...paragrafoProps } = props

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Input
        type="time"
        placeholder="Resposta"
        maxW="fit-content"
        {...register}
      />
    </Box>
  )
}
