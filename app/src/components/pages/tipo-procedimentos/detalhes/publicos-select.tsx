import { Box, Text } from '@chakra-ui/react'
import MultipleSelect from 'components/atoms/multiple-select'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

type Option = {
  value: any
  label: string
}

export default function PublicosSelect() {
  const { setValue, watch } = useFormContext()

  const publicos = watch('publicos', []) as string[]
  const availablePublicos = useSelector(
    selectors.tipoProcedimentoDetalhes.getPublicos
  )

  const publicoOptions = useMemo(() => {
    return availablePublicos.map(publico => ({
      value: publico,
      label: publico
    }))
  }, [publicos])

  const getSelectedOptions = () => {
    return publicoOptions.filter(option => publicos.includes(option.value))
  }

  const handleOnChangeSelecionados = (value: any) => {
    const newValues = value as Option[]
    const values = newValues.map(value => value.value)

    setValue('publicos', values)
  }

  return (
    <Box>
      <Text fontSize="14px" fontWeight="bold" mb="8px">
        Públicos
        <Text as="span" fontWeight="normal" fontSize="10px" ml="8px">
          selecione os públicos que vão poder visualizar e preencher esse
          procedimento
        </Text>
      </Text>
      <MultipleSelect
        isMulti
        value={getSelectedOptions()}
        options={publicoOptions}
        onChange={handleOnChangeSelecionados}
      />
    </Box>
  )
}
