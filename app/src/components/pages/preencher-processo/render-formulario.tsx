import { Box, Stack } from '@chakra-ui/react'
import { campoComponente } from 'components/molecules/forms/fields'
import { FormularioModel } from 'domain/models/formulario'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Footer from './footer'

type Props = {
  formulario: FormularioModel
}

export default function RenderFormulario({ formulario }: Props) {
  const { campos } = formulario

  const methods = useForm()

  function handleClear() {
    return null
  }

  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing="16px">
          {campos.map(campo => {
            const Componente = campoComponente[campo.tipo]

            if (campo.tipo === 'paragrafo') {
              return (
                <Box
                  key={campo.ordem}
                  bgColor="initial.white"
                  py="16px"
                  px="24px"
                  borderRadius="8px"
                >
                  <Componente {...campo} obrigatorio={false} />
                </Box>
              )
            }

            return (
              <Box
                key={campo.ordem}
                bgColor="initial.white"
                px="24px"
                py="32px"
                borderRadius="8px"
              >
                <Componente
                  {...campo}
                  register={methods.register(`campo ${campo.ordem}`, {
                    required: campo.obrigatorio
                  })}
                />
              </Box>
            )
          })}
        </Stack>
        <Footer onClear={handleClear} />
      </form>
    </FormProvider>
  )
}
