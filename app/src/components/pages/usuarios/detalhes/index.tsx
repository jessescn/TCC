import { Box } from '@chakra-ui/react'
import { LoadingPage } from 'components/molecules/loading'
import { ErrorPage } from 'components/pages/error-page'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { UpdateUser } from 'services/usuarios'
import { actions, selectors, store, useSelector } from 'store'
import { UserConfiguration } from './configuration'
import Footer from './footer'
import Header from './header'

export default function Content() {
  const usuario = useSelector(selectors.userDetalhes.getUsuario)
  const statusFetch = useSelector(state => state.userDetalhes.statusFetch)

  const loadForm = useRef(false)
  const formControls = useForm()

  useEffect(() => {
    if (loadForm.current || !usuario) return

    formControls.reset({
      ...usuario,
      publico: usuario.publico || []
    })
    loadForm.current = true
  }, [usuario])

  const onSubmit = (data: any) => {
    if (!usuario) return

    const payload: UpdateUser = {
      nome: data.nome || usuario.nome,
      permissoes: data.permissoes || usuario.permissoes,
      publico: data.publico || usuario.publico
    }

    store.dispatch(
      actions.userDetalhes.update({ data: payload, id: usuario.id })
    )
  }

  if (statusFetch === 'failure') return <ErrorPage />

  return !usuario ? (
    <LoadingPage />
  ) : (
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
          <Header usuario={usuario} />
          <UserConfiguration usuario={usuario} />
          <Footer />
        </form>
      </FormProvider>
    </Box>
  )
}
