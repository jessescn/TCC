import { Box, Divider } from '@chakra-ui/react'
import RenderProcedimento from 'components/organisms/procedimento'
import Header from 'components/organisms/procedimento/header'
import { Procedimento } from 'domain/entity/procedimento'
import { FormularioModel } from 'domain/models/formulario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { getCurrentStatus } from 'utils/procedimento'

type Props = {
  procedimento: ProcedimentoModel
  formularios: FormularioModel[]
}

const Content = ({ procedimento, formularios }: Props) => {
  const status = getCurrentStatus(procedimento)
  const isEditable = status === 'correcoes_pendentes'
  const camposInvalidos = Procedimento.getCamposInvalidos(
    procedimento,
    formularios
  )

  return (
    <Box>
      <Header
        procedimento={procedimento}
        status={getCurrentStatus(procedimento)}
      />
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <RenderProcedimento
        formularios={formularios}
        procedimento={procedimento}
        editable={isEditable}
        camposInvalidos={camposInvalidos}
      />
    </Box>
  )
}

export default Content
