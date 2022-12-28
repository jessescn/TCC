import { Divider, useDisclosure } from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import { Container } from 'components/atoms/container'
import { ContentHeader } from 'components/molecules/content-header'
import Configuration from 'components/pages/formularios/detalhes/configuration'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import Footer from './footer'
import DuplicateFormularioModal from './duplicate-modal'
import FormBuilder from './form-builder'
import PDFTemplate from './pdf-template'

type FormularioForm = {
  nome: string
  descricao: string
  campos: CampoFormulario[]
  template: string | null
}

export default function FormularioDetails() {
  const navigate = useNavigate()

  const statusCreate = useSelector(state => state.formulario.statusCreate)
  const statusUpdate = useSelector(state => state.formulario.statusUpdate)
  const formulario = useSelector(selectors.formularioDetalhes.getFormulario)

  const alreadyInitializeForm = useRef(false)
  const cancelRef = useRef<HTMLButtonElement | FocusableElement>(null)

  const duplicateModalControls = useDisclosure()

  const formControls = useForm<FormularioForm>()

  const onSubmit = (data: FormularioForm) => {
    if (!formulario) {
      store.dispatch(actions.formulario.create(data))
      return
    }

    const hasTemplate = data.template && data.template.length > 0

    const updatedForm: Partial<FormularioModel> = {
      campos: data.campos ?? formulario.campos,
      nome: data.nome ?? formulario.nome,
      template: hasTemplate ? data.template : null,
      descricao: data.descricao ?? formulario.descricao
    }

    store.dispatch(
      actions.formulario.update({ data: updatedForm, id: formulario.id })
    )
  }

  const handleDuplicateModal = (formulario: FormularioModel) => {
    formControls.reset({
      campos: formulario.campos,
      nome: formulario.nome,
      descricao: formulario.descricao,
      template: formulario.template || null
    })
    duplicateModalControls.onClose()
  }

  useEffect(() => {
    if (!formulario || alreadyInitializeForm.current) {
      return
    }

    console.log({ formulario })

    formControls.reset({
      campos: formulario?.campos || [],
      nome: formulario?.nome || '',
      descricao: formulario?.descricao || '',
      template: formulario.template
    })

    alreadyInitializeForm.current = true
  }, [formulario])

  useEffect(() => {
    if (statusCreate === 'success' || statusUpdate === 'success') {
      store.dispatch(actions.formulario.resetStatus())
      navigate('/formularios')
    }
  }, [statusCreate, statusUpdate])

  return (
    <Container>
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onSubmit)}>
          <ContentHeader
            title={formulario ? 'Editar Formulário' : 'Novo Formulário'}
            identifier={formulario?.id}
            updatedAt={formulario?.updatedAt}
          />
          <Divider my="1.5rem" borderColor="secondary.dark" />
          <Configuration onDuplicate={duplicateModalControls.onOpen} />
          <PDFTemplate />
          <FormBuilder onDuplicate={duplicateModalControls.onOpen} />
          <Footer />
        </form>
      </FormProvider>
      {duplicateModalControls.isOpen && (
        <DuplicateFormularioModal
          onConfirm={handleDuplicateModal}
          cancelRef={cancelRef}
          {...duplicateModalControls}
        />
      )}
    </Container>
  )
}
