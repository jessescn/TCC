import { Box, Divider } from '@chakra-ui/react'
import Processo from 'components/organisms/processo'
import Header from 'components/organisms/processo/header'
import { FormularioModel } from 'domain/models/formulario'
import { ProcessoModel } from 'domain/models/processo'
import { getCurrentStatus } from 'utils/procedimento'

type Props = {
  processo: ProcessoModel
  formularios: FormularioModel[]
}

const Content = ({ processo, formularios }: Props) => {
  const status = getCurrentStatus(processo)
  const isEditable = status === 'correcoes_pendentes'

  return (
    <Box h="100%">
      <Header processoId={processo.id} status={getCurrentStatus(processo)} />
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Processo
        formularios={formularios}
        processo={processo}
        editable={isEditable}
      />
    </Box>
  )
}

export default Content
