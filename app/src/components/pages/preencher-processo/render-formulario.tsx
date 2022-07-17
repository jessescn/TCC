import { Box, Stack } from '@chakra-ui/react'
import { campoComponente } from 'components/molecules/forms/fields'
import { FormularioModel } from 'domain/models/formulario'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Footer from './footer'

type Props = {
  formulario: FormularioModel
}

export default function RenderFormulario({ formulario }: Props) {
  const { campos } = formulario

  const { register, handleSubmit, formState } = useForm()

  function handleClear() {
    return null
  }

  function onSubmit(data: any) {
    console.log(data)
  }

  useEffect(() => {
    console.log(formState)
  }, [formState])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="16px" overflowY="auto">
        {campos.map(campo => {
          const Componente = campoComponente[campo.tipo]

          return (
            <Box bgColor="initial.white" px="24px" py="32px" borderRadius="8px">
              <Componente
                {...campo}
                register={register(`campo ${campo.ordem}`, {
                  required: campo.obrigatorio
                })}
              />
            </Box>
          )
        })}
      </Stack>
      <Footer onClear={handleClear} />
    </form>
  )
}
