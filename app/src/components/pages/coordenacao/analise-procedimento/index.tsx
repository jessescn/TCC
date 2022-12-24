import { Divider } from '@chakra-ui/react'
import { Container } from 'components/atoms/container'
import Procedimento from 'components/organisms/procedimento-render'
import Header from 'components/organisms/procedimento-render/header'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoInvalido } from 'domain/models/procedimento'
import { useState } from 'react'
import { selectors, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'
import Footer from './footer'

export type CustomCampoInvalido = CampoInvalido & {
  campo: CampoFormulario
}

export default function AnaliseProcedimento() {
  const [camposInvalidos, setCamposInvalidos] = useState<CustomCampoInvalido[]>(
    []
  )

  const formularios = useSelector(selectors.procedimentoDetalhes.getFormularios)
  const procedimento = useSelector(
    selectors.procedimentoDetalhes.getProcedimento
  )

  const currentStatus = procedimento
    ? getCurrentStatus(procedimento)
    : undefined

  const handleInvalidateField = (campo: CustomCampoInvalido) => {
    const idx = camposInvalidos.findIndex(
      campoInvalido => campoInvalido.ordem === campo.ordem
    )

    if (idx === -1) {
      setCamposInvalidos(prev => [...prev, campo])
      return
    }

    const copy = [...camposInvalidos]
    copy.splice(idx, 1)

    setCamposInvalidos(copy)
  }

  return !procedimento ? null : (
    <Container>
      <Header procedimento={procedimento} status={currentStatus} />
      <Divider borderWidth="1px" borderColor="#EEE" my="1.5rem" />
      <Procedimento
        formularios={formularios}
        procedimento={procedimento}
        camposInvalidos={camposInvalidos}
        onInvalidateField={handleInvalidateField}
      />
      <Footer
        camposInvalidos={camposInvalidos}
        setCamposInvalidos={setCamposInvalidos}
        procedimento={procedimento}
      />
    </Container>
  )
}
