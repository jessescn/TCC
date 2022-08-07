import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { CustomCampoInvalido } from 'components/pages/analisar-processo/content'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { CampoInvalido, ProcessoModel, Resposta } from 'domain/models/processo'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'
import SaveChangesModal from './modals/save-changes'
import RenderContent from './render-campos'

type Props = {
  formulario: FormularioModel
  processo: ProcessoModel
  camposInvalidos?: CustomCampoInvalido[]
  editable?: boolean
  handleInvalidate?: (question: CustomCampoInvalido) => void
}

type CustomFormModel = {
  respostas: Resposta[]
}

export default function Formulario({
  formulario,
  processo,
  editable = false,
  camposInvalidos = [],
  handleInvalidate
}: Props) {
  const navigate = useNavigate()
  const statusUpdate = useSelector(state => state.processo.status)
  const saveChangesModalControls = useDisclosure()

  const methods = useForm<CustomFormModel>({
    defaultValues: { respostas: processo.respostas }
  })

  const updateResposta = (data: CustomFormModel) => {
    saveChangesModalControls.onClose()
    store.dispatch(
      actions.processo.update({
        id: processo.id,
        data: { respostas: data.respostas }
      })
    )
  }

  useEffect(() => {
    if (statusUpdate === 'success') {
      store.dispatch(actions.processo.resetStatus())
      navigate(-1)
    }
  }, [statusUpdate])

  return (
    <FormProvider {...methods}>
      <form id="processo-form" onSubmit={methods.handleSubmit(updateResposta)}>
        <RenderContent
          formulario={formulario}
          editable={editable}
          camposInvalidos={camposInvalidos}
          handleInvalidate={handleInvalidate}
        />
        {editable && !handleInvalidate && (
          <Flex justifyContent="flex-end" mt="16px">
            <Button
              bgColor="primary.dark"
              color="initial.white"
              display="block"
              size="sm"
              onClick={saveChangesModalControls.onOpen}
            >
              Salvar alterações
            </Button>
          </Flex>
        )}
        <SaveChangesModal {...saveChangesModalControls} />
      </form>
    </FormProvider>
  )
}
