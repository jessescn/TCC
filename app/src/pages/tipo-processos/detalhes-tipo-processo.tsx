import { Box, Divider, Flex, Input, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import EditableText from 'components/molecules/forms/editable-text'
import Header from 'components/pages/tipo-processo/header'
import Content from 'components/pages/tipo-processo/content'
import Footer from 'components/pages/tipo-processo/footer'

export default function TipoProcesso() {
  const navigate = useNavigate()
  const formControls = useForm()

  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

  const tipoProcesso = !isNaN(id)
    ? useSelector(selectors.tipoProcesso.getTipoProcesso)(id)
    : undefined

  useEffect(() => {
    store.dispatch(actions.tipoProcesso.list())
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
            <Header tipo={tipoProcesso} />
            <Divider my="24px" borderColor="secondary.dark" />
            <Content tipoProcesso={tipoProcesso} />
            <Footer />
          </form>
        </FormProvider>
      </Box>
    </Screen>
  )
}
