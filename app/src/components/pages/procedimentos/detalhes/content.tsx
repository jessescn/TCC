import { Box, Divider } from '@chakra-ui/react'
import RenderProcedimento from 'components/organisms/procedimento'
import Header from 'components/organisms/procedimento/header'
import { Procedimento } from 'domain/entity/procedimento'
import { selectors, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'

const Content = () => {
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
