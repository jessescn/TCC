import { Box, Divider } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import Content from 'components/pages/formularios/detalhes/content'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import PageHeader from 'components/molecules/page-header'

type FormularioForm = {
  nome: string
  descricao: string
  campos: CampoFormulario[]
}

export default function FormularioDetails() {
  const navigate = useNavigate()

  const statusCreate = useSelector(state => state.formulario.statusCreate)
  const statusUpdate = useSelector(state => state.formulario.statusUpdate)

  const formulario = useSelector(selectors.formularioDetalhes.getFormulario)

  const alreadyInitializeForm = useRef(false)

  const formControls = useForm<FormularioForm>()

  const onSubmit = (data: FormularioForm) => {
    if (!formulario) {
      store.dispatch(actions.formulario.create(data))
      return
    }

    const updatedForm: Partial<FormularioModel> = {
      campos: data.campos ?? formulario.campos,
      nome: data.nome ?? formulario.nome,
      descricao: data.descricao ?? formulario.descricao
    }

    store.dispatch(
      actions.formulario.update({ data: updatedForm, id: formulario.id })
    )
  }

  useEffect(() => {
    if (!formulario || alreadyInitializeForm.current) {
      return
    }

    formControls.reset({
      campos: formulario?.campos || [],
      nome: formulario?.nome || '',
      descricao: formulario?.descricao || ''
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
    <Box
      w="100%"
      h="100%"
      maxW="1200px"
      bgColor="initial.white"
      borderRadius="8px"
      px="24px"
      py="32px"
    >
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onSubmit)}>
          <PageHeader
            title={formulario ? 'Editar Formulário' : 'Novo Formulário'}
            identifier={formulario?.id}
            updatedAt={formulario?.updatedAt}
          />
          <Divider my="24px" borderColor="secondary.dark" />
          <Content formulario={formulario} />
        </form>
      </FormProvider>
    </Box>
  )
}
