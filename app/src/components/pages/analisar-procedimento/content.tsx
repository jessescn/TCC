import { Box, Button, Divider, Flex, useDisclosure } from '@chakra-ui/react'
import InvalidFieldsModal from 'components/pages/analisar-procedimento/modals/invalid-fields'
import Procedimento from 'components/organisms/procedimento'
import Header from 'components/organisms/procedimento/header'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import {
  CampoInvalido,
  ProcedimentoModel,
  ProcedimentoStatus
} from 'domain/models/procedimento'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'
import ConfirmApproveModal from './modals/confirm-approve'

type Props = {
  procedimento: ProcedimentoModel
  formularios: FormularioModel[]
}

export type CustomCampoInvalido = CampoInvalido & {
  campo: CampoFormulario
}

export default function Content({ formularios, procedimento }: Props) {
  const navigate = useNavigate()
  const invalidModalControls = useDisclosure()
  const confirmApproveControls = useDisclosure()

  const statusUpdateStatus = useSelector(
    state => state.procedimento.statusUpdateStatus
  )

  const statusRevisao = useSelector(state => state.procedimento.statusRevisao)
  const isLoading =
    statusRevisao === 'loading' || statusUpdateStatus === 'loading'

  const [feedback, setFeedback] = useState('')
  const [camposInvalidos, setCamposInvalidos] = useState<CustomCampoInvalido[]>(
    []
  )

  const handleClearInvalidations = useCallback(() => {
    setCamposInvalidos([])
  }, [])

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

  const handleRequestAdjustment = () => {
    invalidModalControls.onClose()
    store.dispatch(
      actions.procedimento.novaRevisao({
        id: procedimento.id,
        data: {
          campos: camposInvalidos,
          comentario: feedback
        }
      })
    )
  }

  const handleApproveProcedimento = () => {
    const nextStatus: ProcedimentoStatus = procedimento.tipo_procedimento
      ?.colegiado
      ? 'em_homologacao'
      : 'deferido'

    confirmApproveControls.onClose()
    store.dispatch(
      actions.procedimento.updateStatus({
        id: procedimento.id,
        status: nextStatus
      })
    )
  }

  useEffect(() => {
    if (statusUpdateStatus === 'success' || statusRevisao === 'success') {
      store.dispatch(actions.procedimento.resetStatus())
      navigate('/coordenacao/procedimentos')
    }
  }, [statusUpdateStatus, statusRevisao])

  return (
    <Box h="100%">
      <Header
        procedimento={procedimento}
        status={getCurrentStatus(procedimento)}
      />
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Procedimento
        formularios={formularios}
        procedimento={procedimento}
        camposInvalidos={camposInvalidos}
        onInvalidateField={handleInvalidateField}
      />
      <Flex justifyContent="flex-end" mt="16px" alignItems="center">
        <Button
          size="xs"
          _focus={{ boxShadow: 'none' }}
          variant="unstyled"
          mr="8px"
          onClick={handleClearInvalidations}
          hidden={isLoading}
        >
          Limpar correção
        </Button>
        <Button
          borderColor="info.error"
          borderWidth="1px"
          size="sm"
          bgColor="initial.white"
          color="info.error"
          _hover={{ color: 'initial.white', bgColor: 'info.error' }}
          mx="8px"
          disabled={camposInvalidos.length === 0}
          onClick={invalidModalControls.onOpen}
          hidden={isLoading}
        >
          Submeter Correções
        </Button>
        <Button
          borderColor="primary.dark"
          borderWidth="1px"
          size="sm"
          bgColor="initial.white"
          color="primary.dark"
          _hover={{ color: 'initial.white', bgColor: 'primary.dark' }}
          isLoading={isLoading}
          onClick={confirmApproveControls.onOpen}
          disabled={camposInvalidos.length > 0}
          loadingText="Salvando"
        >
          Aprovar
        </Button>
      </Flex>
      <ConfirmApproveModal
        {...confirmApproveControls}
        isColegiado={procedimento.tipo_procedimento?.colegiado || false}
        onConfirm={handleApproveProcedimento}
      />
      <InvalidFieldsModal
        {...invalidModalControls}
        invalidFields={camposInvalidos.map(
          campoInvalido => campoInvalido.campo
        )}
        onSendFeedback={handleRequestAdjustment}
        setFeedback={setFeedback}
      />
    </Box>
  )
}
