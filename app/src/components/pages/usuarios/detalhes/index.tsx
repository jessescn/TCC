import { Container } from 'components/atoms/container'
import { ContentHeader } from 'components/molecules/content-header'
import { ErrorPage } from 'components/pages/error-page'
import { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { UpdateUser } from 'services/usuarios'
import { actions, selectors, store, useSelector } from 'store'
import UsuarioConfiguration from './configuration'
import Footer from './footer'

export default function UsuarioDetails() {
  const loadForm = useRef(false)
  const formControls = useForm()

  const usuario = useSelector(selectors.userDetalhes.getUsuario)
  const statusFetch = useSelector(state => state.userDetalhes.statusFetch)

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

  return (
    <Container>
      <FormProvider {...formControls}>
        <form onSubmit={formControls.handleSubmit(onSubmit)}>
          <ContentHeader
            title="Editar Usuário"
            identifier={usuario?.id}
            updatedAt={usuario?.updatedAt}
          />
          <UsuarioConfiguration usuario={usuario} />
          <Footer />
        </form>
      </FormProvider>
    </Container>
  )
}
