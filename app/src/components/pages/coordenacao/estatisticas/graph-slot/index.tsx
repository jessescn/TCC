import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { FormularioModel } from 'domain/models/formulario'
import { useEffect, useState } from 'react'
import { actions, selectors, store, useSelector } from 'store'
import { DataFetchPayload } from 'store/ducks/analise-dados'
import FormularioSelect from './formulario-select'
import TipoProcedimentoSelect from './tipo-procedimento-select'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

function GraphSlotModal(props: ModalProps) {
  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )
  const currentData = useSelector(state => state.analiseDados.dataInfo)
  const [formulario, setFormulario] = useState<FormularioModel>()
  const [campo, setCampo] = useState<string>()

  const status = useSelector(state => state.analiseDados.fetchStatus)

  function handleChangeForm(formulario: FormularioModel) {
    setFormulario(formulario)
    setCampo(undefined)
  }

  function handleChangeTipo(id: number) {
    store.dispatch(actions.tipoProcedimentoDetalhes.getInfo(id.toString()))
    setFormulario(undefined)
    setCampo(undefined)
  }

  useEffect(() => {
    store.dispatch(actions.tipoProcedimentoDetalhes.resetStatus())
  }, [])

  function handleAddGraph() {
    if (campo && formulario && tipoProcedimento) {
      const payload: DataFetchPayload = {
        tipo: tipoProcedimento.id,
        formulario: formulario.id,
        type: 'bar',
        campo,
        position: currentData.length
      }
      store.dispatch(actions.analiseDados.fetchData(payload))
    }
  }

  useEffect(() => {
    if (status === 'success') {
      store.dispatch(actions.analiseDados.resetStatus())
      props.onClose()
    }
  }, [status])

  const isAddDisabled = !formulario || !campo || !tipoProcedimento

  return (
    <Modal {...props} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="xl">Adicionar Novo Gráfico</Text>
        </ModalHeader>
        <ModalBody height="fit-content">
          <TipoProcedimentoSelect onChangeTipo={handleChangeTipo} />
          <FormularioSelect
            onChangeCampo={setCampo}
            onChangeFormulario={handleChangeForm}
            formulario={formulario}
            campo={campo}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={status === 'loading'}
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

export default function GraphSlot() {
  const controls = useDisclosure()

  return (
    <>
      <Center border="1px dashed #000" w="100%" height="100%">
        <Button onClick={controls.onOpen}>Novo Gráfico</Button>
      </Center>
      {controls.isOpen && <GraphSlotModal {...controls} />}
    </>
  )
}
