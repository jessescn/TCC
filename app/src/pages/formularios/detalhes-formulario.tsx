import { Box, Divider, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import EditableText from 'components/molecules/forms/editable-text'
import Header from '../../components/pages/detalhes-formulario/header'
import Content from 'components/pages/detalhes-formulario/content'

export default function Form() {
  const navigate = useNavigate()
  const formControls = useForm()

  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

  const formulario = useSelector(state =>
    selectors.form.getFormularioById(state)(Number(id))
  )

  useEffect(() => {
    store.dispatch(actions.form.list())
  }, [])

  return (
    <Screen py="24px">
      <Box
        w="100%"
        h="100%"
        maxW="900px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <FormProvider {...formControls}>
          <form>
            <Header formulario={formulario} />
            <Divider my="24px" borderColor="secondary.dark" />
            <Content formulario={formulario} />
          </form>
        </FormProvider>
      </Box>
    </Screen>
  )
}
