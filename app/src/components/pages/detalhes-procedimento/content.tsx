import { Box, Divider } from '@chakra-ui/react'
import Procedimento from 'components/organisms/procedimento'
import Header from 'components/organisms/procedimento/header'
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

  return (
    <Box h="100%">
      <Header
        procedimentoId={procedimento.id}
        status={getCurrentStatus(procedimento)}
      />
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Procedimento
        formularios={formularios}
        procedimento={procedimento}
        editable={isEditable}
      />
    </Box>
  )
}

export default Content
