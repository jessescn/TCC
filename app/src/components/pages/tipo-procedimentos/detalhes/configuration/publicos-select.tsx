import { Box, Text } from '@chakra-ui/react'
import MultipleSelect, { SelectOption } from 'components/atoms/multiple-select'
import { InfoIcon } from 'components/molecules/info'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

export default function PublicosSelect() {
  const { setValue, watch } = useFormContext()

  const publicos: string[] = watch('publicos', []) || []
  const existentPublicos = useSelector(
    selectors.tipoProcedimentoDetalhes.getPublicos
  )

  const publicoOptions = useMemo(() => {
    const composedList = new Set([...existentPublicos, ...publicos])
    const availablePublicos = [...new Set(composedList)]

    return availablePublicos.map(publico => ({
      value: publico,
      label: publico
    }))
  }, [publicos, existentPublicos])

  const getSelectedOptions = () => {
    return publicoOptions.filter(option => publicos.includes(option.value))
  }

  const handleOnChangeSelecionados = (value: any) => {
    const newValues = value as SelectOption[]
    const values = newValues.map(value => value.value)

    setValue('publicos', values)
  }

  return (
    <Box>
      <Text fontSize="14px" fontWeight="bold" mb="8px">
        Públicos
        <InfoIcon
          label="Apenas os usuários que possuirem ao menos um dos públicos listados
          terão acesso ao procedimento."
        />
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
