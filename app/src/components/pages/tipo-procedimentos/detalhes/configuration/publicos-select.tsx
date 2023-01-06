import { Box, Flex, Text } from '@chakra-ui/react'
import { SelectOption, MultipleSelect } from 'components/atoms/multiple-select'
import { InfoIcon } from 'components/molecules/info'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { selectors, useSelector } from 'store'

export default function PublicosSelect() {
  const { setValue, watch } = useFormContext()

  const publicos: string[] = watch('publicos') || []
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
      <Flex alignItems="center" mb="8px">
        <Text fontSize="sm" fontWeight="bold" mb="0.5rem">
          Públicos
        </Text>
        <InfoIcon
          label="Apenas os usuários que possuirem ao menos um dos públicos listados
          terão acesso ao procedimento."
        />
      </Flex>
      <MultipleSelect
        isMulti
        value={getSelectedOptions()}
        options={publicoOptions}
        onChange={handleOnChangeSelecionados}
      />
    </Box>
  )
}
