import { Box, Divider } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import Content from 'components/pages/detalhes-formulario/content'
import Header from '../../components/pages/detalhes-formulario/header'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'

type FormularioForm = {
  nome: string
  descricao: string
  campos: CampoFormulario[]
}

export default function Form() {
  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

  const formulario = useSelector(state =>
    selectors.form.getFormularioById(state)(Number(id))
  )

  const alreadyInitializeForm = useRef(false)

  const formControls = useForm<FormularioForm>()

  const onSubmit = (data: FormularioForm) => {
    if (!formulario) {
      store.dispatch(actions.form.create(data))
      return
    }

    const updatedForm: FormularioModel = { ...formulario, ...data }

    store.dispatch(
      actions.form.update({ data: updatedForm, id: formulario.id })
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

  return (
    <Screen py="24px">
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
            <Header formulario={formulario} />
            <Divider my="24px" borderColor="secondary.dark" />
            <Content formulario={formulario} />
          </form>
        </FormProvider>
      </Box>
    </Screen>
  )
}
