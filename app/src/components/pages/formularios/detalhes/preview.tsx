import { Box } from '@chakra-ui/react'
import { FormularioRender } from 'components/organisms/formulario-render'
import { FormularioModel } from 'domain/models/formulario'
import { useFormContext } from 'react-hook-form'

export default function Preview() {
  const { watch } = useFormContext()

  const nome = watch('nome') || ''
  const descricao = watch('descricao') || ''
  const campos = watch('campos') || []

  const buildFakeFormulario = () => {
    const fakeFormulario: FormularioModel = {
      id: 0,
      campos,
      deleted: false,
      nome,
      descricao,
      template: null
    }

    return fakeFormulario
  }

  return (
    <Box bgColor="secondary.default" p={4}>
      <FormularioRender formulario={buildFakeFormulario()} />
    </Box>
  )
}
