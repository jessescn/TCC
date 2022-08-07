import { Box, Button, Divider, Flex, useDisclosure } from '@chakra-ui/react'
import InvalidFieldsModal from 'components/pages/analisar-processo/modals/invalid-fields'
import Processo from 'components/organisms/processo'
import Header from 'components/organisms/processo/header'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import {
  CampoInvalido,
  ProcessoModel,
  ProcessoStatus
} from 'domain/models/processo'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'
import ConfirmApproveModal from './modals/confirm-approve'

type Props = {
  processo: ProcessoModel
  formularios: FormularioModel[]
}

export type CustomCampoInvalido = CampoInvalido & {
  campo: CampoFormulario
}

export default function Content({ formularios, processo }: Props) {
  const navigate = useNavigate()
  const invalidModalControls = useDisclosure()
  const confirmApproveControls = useDisclosure()

  const statusUpdateStatus = useSelector(
    state => state.processo.statusUpdateStatus
  )

  const statusRevisao = useSelector(state => state.processo.statusRevisao)

  const [feedback, setFeedback] = useState('')
  const [camposInvalidos, setCamposInvalidos] = useState<CustomCampoInvalido[]>(
    []
  )

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
      actions.processo.novaRevisao({
        id: processo.id,
        data: {
          campos: camposInvalidos,
          comentario: feedback
        }
      })
    )
  }

  const handleApproveProcedimento = () => {
    const nextStatus: ProcessoStatus = processo.tipo_processo?.colegiado
      ? 'em_homologacao'
      : 'deferido'

    confirmApproveControls.onClose()
    store.dispatch(
      actions.processo.updateStatus({
        id: processo.id,
        status: nextStatus
      })
    )
  }

  useEffect(() => {
    if (statusUpdateStatus === 'success' || statusRevisao === 'success') {
      store.dispatch(actions.processo.resetStatus())
      navigate('/coordenacao/processos')
    }
  }, [statusUpdateStatus, statusRevisao])

  return (
    <Box h="100%">
      <Header processoId={processo.id} status={getCurrentStatus(processo)} />
      <Divider borderWidth="1px" borderColor="#EEE" my="16px" />
      <Processo
        formularios={formularios}
        processo={processo}
        camposInvalidos={camposInvalidos}
        handleInvalidateField={handleInvalidateField}
      />
      <Flex justifyContent="flex-end" mt="16px">
        <Button
          borderColor="info.error"
          borderWidth="1px"
          size="sm"
          bgColor="initial.white"
          color="info.error"
          _hover={{ color: 'initial.white', bgColor: 'info.error' }}
          mr="8px"
          disabled={camposInvalidos.length === 0}
          onClick={invalidModalControls.onOpen}
          isLoading={statusUpdateStatus === 'loading'}
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
          isLoading={statusUpdateStatus === 'loading'}
          onClick={confirmApproveControls.onOpen}
          disabled={camposInvalidos.length > 0}
        >
          Aprovar
        </Button>
      </Flex>
      <ConfirmApproveModal
        {...confirmApproveControls}
        isColegiado={processo.tipo_processo?.colegiado || false}
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
