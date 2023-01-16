import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { LoadingPage } from 'components/molecules/loading'
import { useEffect, useState } from 'react'
import { actions, selectors, store, useSelector } from 'store'
import {
  DataFetchPayload,
  DataFetched,
  GraphType
} from 'store/ducks/analise-dados'
import FormularioSelect from './formulario-select'
import GraphSelect from './graph-select'
import TipoProcedimentoSelect from './tipo-procedimento-select'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  position: number
  current?: DataFetched
}

export default function EditGraphModal(props: ModalProps) {
  const { current, position } = props

  const [formulario, setFormulario] = useState<number | undefined>(
    current?.formulario
  )
  const [campo, setCampo] = useState<string | undefined>(current?.campo)
  const [graphType, setGraphType] = useState<GraphType | undefined>(
    current?.type
  )

  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )
  const fetchTipoInfoStatus = useSelector(
    state => state.tipoProcedimentoDetalhes.statusFetch
  )
  const fetchDadosStatus = useSelector(state => state.analiseDados.fetchStatus)

  function handleChangeForm(formularioId: number) {
    setFormulario(formularioId)
    setCampo(undefined)
  }

  function handleChangeTipo(id: number) {
    store.dispatch(actions.tipoProcedimentoDetalhes.getInfo(id.toString()))
    setFormulario(undefined)
    setCampo(undefined)
  }

  useEffect(() => {
    if (current) {
      store.dispatch(
        actions.tipoProcedimentoDetalhes.getInfo(String(current.tipo))
      )
    } else {
      store.dispatch(actions.tipoProcedimentoDetalhes.resetStatus())
    }
  }, [])

  function handleAddGraph() {
    if (campo && formulario && tipoProcedimento && graphType) {
      const payload: DataFetchPayload = {
        tipo: tipoProcedimento.id,
        formulario: formulario,
        type: graphType,
        campo,
        position
      }
      store.dispatch(actions.analiseDados.fetchData(payload))
    }
  }

  useEffect(() => {
    if (fetchDadosStatus === 'success') {
      store.dispatch(actions.analiseDados.resetStatus())
      props.onClose()
    }
  }, [fetchDadosStatus])

  const isAddDisabled = !formulario || !campo || !tipoProcedimento || !graphType

  const modalTitle = current ? 'Editar Gráfico' : 'Novo Gráfico'

  return (
    <Modal {...props} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="xl">{modalTitle}</Text>
          <Text fontSize="xs" fontWeight="normal">
            Adicione um novo gráfico, selecione o tipo procedimento, formulário
            e campo dos dados que você quer visualizar.
          </Text>
        </ModalHeader>
        <ModalBody height="fit-content">
          {fetchTipoInfoStatus === 'loading' ? (
            <LoadingPage default />
          ) : (
            <>
              <TipoProcedimentoSelect onChangeTipo={handleChangeTipo} />
              <FormularioSelect
                onChangeCampo={setCampo}
                onChangeFormulario={handleChangeForm}
                formularioId={formulario}
                campo={campo}
              />
              {campo && formulario && tipoProcedimento && (
                <GraphSelect value={graphType} onChange={setGraphType} />
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={fetchDadosStatus === 'loading'}
            onClick={handleAddGraph}
            size="sm"
            isDisabled={isAddDisabled}
          >
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
