import { Divider } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
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
    <Container>
      <ProcedimentoHeader
        procedimento={procedimento}
        status={getCurrentStatus(procedimento)}
      />
      <Divider borderWidth="1px" borderColor="#EEE" my="1.5rem" />
      <ProcedimentoRender
        formularios={formularios}
        procedimento={procedimento}
        editable={isEditable}
        camposInvalidos={camposInvalidos}
      />
    </Container>
  )
}
