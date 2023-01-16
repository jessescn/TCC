import { Text } from '@chakra-ui/react'
import { MultipleSelect } from 'components/atoms/multiple-select'
import { GraphType } from 'store/ducks/analise-dados'

type Props = {
  onChange: (graph: GraphType) => void
  value?: string
}

export default function GraphSelect({ onChange, value }: Props) {
  const graphOptions = [
    {
      label: 'PieChart',
      value: 'pie'
    },
    {
      label: 'BarChart',
      value: 'bar'
    },
    {
      label: 'RadialChart',
      value: 'radial'
    }
  ]

  const currentValue = graphOptions.find(option => option.value === value)

  return (
    <>
      <Text my="0.5rem" fontSize="14px">
        Selecione o gráfico:
      </Text>
      <MultipleSelect
        options={graphOptions}
        value={currentValue}
        onChange={e => onChange(e?.value as GraphType)}
      />
    </>
  )
}
