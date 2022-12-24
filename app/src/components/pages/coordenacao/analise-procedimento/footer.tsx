import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { CampoFormulario } from 'domain/models/formulario'
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
import InvalidFieldsModal from './modals/invalid-fields'

export type CustomCampoInvalido = CampoInvalido & {
  campo: CampoFormulario
}

type Props = {
  procedimento: ProcedimentoModel
  camposInvalidos: CustomCampoInvalido[]
  setCamposInvalidos: (campos: CustomCampoInvalido[]) => void
}

export default function Footer({
  procedimento,
  camposInvalidos,
  setCamposInvalidos
}: Props) {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')

  const invalidModalControls = useDisclosure()
  const confirmApproveControls = useDisclosure()

  const statusRevisao = useSelector(state => state.procedimento.statusRevisao)
  const statusUpdateStatus = useSelector(
    state => state.procedimento.statusUpdateStatus
  )

  const currentStatus = procedimento
    ? getCurrentStatus(procedimento)
    : undefined

  const canAnalyze = currentStatus === 'em_analise'

  const isLoading =
    statusRevisao === 'loading' || statusUpdateStatus === 'loading'

  const handleClearInvalidations = useCallback(() => {
    setCamposInvalidos([])
  }, [])

  const handleRequestChanges = () => {
    if (!procedimento) return

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
    if (!procedimento) return

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
    <>
      {!canAnalyze && (
        <Flex justifyContent="flex-end" my="0.5rem">
          <Text fontSize="xs" color="info.error">
            O processo não pode ser analisado nesse status
          </Text>
        </Flex>
      )}
      <Flex justifyContent="flex-end" mt="1rem" alignItems="center">
        <Button
          size="sm"
          customVariant="ghost"
          onClick={handleClearInvalidations}
          hidden={isLoading}
          disabled={!canAnalyze}
        >
          Limpar correção
        </Button>
        <Button
          customVariant="outline"
          size="sm"
          color="info.error"
          borderColor="info.error"
          borderWidth="2px"
          _hover={{
            color: 'initial.white',
            bgColor: 'info.error',
            _disabled: {
              bgColor: 'initial.white',
              color: 'info.error'
            }
          }}
          mx="0.5rem"
          disabled={camposInvalidos.length === 0 || !canAnalyze}
          onClick={invalidModalControls.onOpen}
          hidden={isLoading}
        >
          Submeter Correções
        </Button>
        <Button
          size="sm"
          isLoading={isLoading}
          onClick={confirmApproveControls.onOpen}
          disabled={camposInvalidos.length > 0 || !canAnalyze}
          loadingText="Processando"
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
        onSendFeedback={handleRequestChanges}
        setFeedback={setFeedback}
      />
    </>
  )
}
