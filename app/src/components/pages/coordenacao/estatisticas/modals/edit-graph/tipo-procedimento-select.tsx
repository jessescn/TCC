import { Text } from '@chakra-ui/react'
import { MultipleSelect, SelectOption } from 'components/atoms/multiple-select'
import { selectors, useSelector } from 'store'

type Props = {
  onChangeTipo: (id: number) => void
}

export default function TipoProcedimentoSelect({ onChangeTipo }: Props) {
  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )
  const tipoProcedimentos = useSelector(
    selectors.tipoProcedimento.getTipoProcedimentos
  )
  const options: SelectOption[] = tipoProcedimentos.map(tipo => ({
    value: tipo.id,
    label: `${tipo.nome} (id: ${tipo.id})`
  }))

  return (
    <>
      <Text my="0.5rem" fontSize="14px">
        Selecione o tipo procedimento:
      </Text>
      <MultipleSelect
        options={options}
        value={options.find(option => option.value === tipoProcedimento?.id)}
        onChange={e => onChangeTipo(e?.value)}
      />
    </>
  )
}
