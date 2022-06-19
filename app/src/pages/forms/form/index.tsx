import { Box, Divider, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

import EditableText from 'components/molecules/forms/editable-text'
import Builder from './builder'
import Header from './header'

export default function Form() {
  const navigate = useNavigate()
  const formControls = useForm()

  const [searchParams] = useSearchParams()

  const id = Number(searchParams.get('id'))

  const form = !isNaN(id)
    ? useSelector(selectors.form.getFormById)(id)
    : undefined

  useEffect(() => {
    store.dispatch(actions.form.list())
  }, [])

  return (
    <Screen py="24px">
      <Box
        w="100%"
        h="100%"
        maxW="1392px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      >
        <FormProvider {...formControls}>
          <form>
            <Header form={form} />
            <Divider my="24px" borderColor="secondary.dark" />
            <EditableText
              defaultValue={form?.nome || 'Novo formulário'}
              styleProps={{ mb: 2 }}
              register={formControls.register('nome', { required: true })}
            >
              <Text mr="16px" fontSize="14px">
                Nome:
              </Text>
            </EditableText>
            <EditableText
              defaultValue="descricão do formulário"
              register={formControls.register('descricao', { required: true })}
            >
              <Text mr="16px" fontSize="14px">
                Descricão:
              </Text>
            </EditableText>
            <Box>
              <Builder form={form} />
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Screen>
  )
}
