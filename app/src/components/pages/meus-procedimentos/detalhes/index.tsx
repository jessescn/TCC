import { Box, Divider } from '@chakra-ui/react'
import ProcedimentoRender from 'components/organisms/procedimento-render'
import ProcedimentoHeader from 'components/organisms/procedimento-render/header'
import { Procedimento } from 'domain/entity/procedimento'
import { selectors, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'

export default function MeusProcedimentosDetails() {
  const procedimento = useSelector(
    selectors.procedimentoDetalhes.getProcedimento
  )
  const formularios = useSelector(selectors.procedimentoDetalhes.getFormularios)

  const status = procedimento ? getCurrentStatus(procedimento) : undefined
  const isEditable = status === 'correcoes_pendentes'
  const camposInvalidos = procedimento
    ? Procedimento.getCamposInvalidos(procedimento, formularios)
    : []

  return !procedimento ? null : (
    <Box
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
      w="100%"
      h="100%"
      maxW="1200px"
      bgColor="initial.white"
      borderRadius="8px"
      px="24px"
      py="32px"
      position="relative"
    >
      <ProcedimentoHeader
        procedimento={procedimento}
        status={getCurrentStatus(procedimento)}
      />
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <ProcedimentoRender
        formularios={formularios}
        procedimento={procedimento}
        editable={isEditable}
        camposInvalidos={camposInvalidos}
      />
    </Box>
  )
}
