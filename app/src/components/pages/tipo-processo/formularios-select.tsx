import { Box, Text } from '@chakra-ui/react'
import MultipleSelect from 'components/atoms/multiple-select'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

type Option = {
  value: any
  label: string
}

type Props = {
  tipoProcesso?: TipoProcessoModel
}

export default function FormularioSelect({ tipoProcesso }: Props) {
  const { setValue } = useFormContext()
  const initialPopulated = useRef(false)

  const [selectedFormOptions, setSelectedFormOptions] = useState<Option[]>([])

  const formularios = useSelector(selectors.form.getFormularios)

  const formOptions = formularios.map(formulario => ({
    value: formulario.id,
    label: formulario.nome
  }))

  useEffect(() => {
    if (initialPopulated.current || !tipoProcesso || formOptions.length === 0) {
      return
    }

    const options = formOptions.filter(option =>
      tipoProcesso?.formularios.includes(Number(option.value))
    )

    setSelectedFormOptions(options)
    initialPopulated.current = true
  }, [formOptions, tipoProcesso])

  useEffect(() => {
    const ids = selectedFormOptions.map(formOption => formOption.value)
    setValue('formularios', ids)
  }, [selectedFormOptions])

  return (
    <Box>
      <Text fontSize="14px" fontWeight="bold" mb="8px">
        Formulários
      </Text>
      <MultipleSelect
        isMulti
        options={formOptions}
        value={selectedFormOptions}
        onChange={value => setSelectedFormOptions(value as any)}
      />
    </Box>
  )
}
