import {
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoGrelhaMultipla } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoGrelhaMultipla>

export function BaseCampoGrelhaMultipla({
  onChange,
  isInvalid,
  campo,
  ...props
}: Props) {
  const { colunas, linhas } = props.configuracao_campo
  const currentValue = (campo?.valor || []) as string[]

  function getSelectedItemIdxByRow(rowId: number) {
    return currentValue.findIndex(v => JSON.parse(v)[0] === rowId)
  }

  function getSelectedItemByRow(rowId: number) {
    const idx = getSelectedItemIdxByRow(rowId)

    if (idx === -1) return

    return currentValue[idx]
  }

  function appendNewSelection(value: string) {
    onChange({
      ordem: props.ordem,
      valor: [...currentValue, value]
    })
  }

  function updateCurrentValue(value: string, idx: number) {
    const copy = JSON.parse(JSON.stringify(currentValue)) as string[]

    copy.splice(idx, 1, value)
    onChange({
      ordem: props.ordem,
      valor: copy
    })
  }

  function handleChange(newValue: string) {
    const parsedValue = JSON.parse(newValue) as number[]
    const [Row] = parsedValue

    const currentRowIdxValue = getSelectedItemIdxByRow(Row)

    if (currentRowIdxValue === -1) {
      appendNewSelection(newValue)
    } else {
      updateCurrentValue(newValue, currentRowIdxValue)
    }
  }

  return (
    <ErrorWrapper
      isInvalid={isInvalid}
      message="Preencha corretamente todas as linhas"
    >
      <CampoParagrafo {...props} />
      <Table>
        <Thead>
          <Tr>
            <Th key="campo-vazio"></Th>
            {colunas.map((coluna, idx) => (
              <Th key={`coluna-${idx}`} textAlign="center">
                {coluna}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {linhas.map((linha, idx) => (
            <RadioGroup
              as="tr"
              onChange={handleChange}
              value={getSelectedItemByRow(idx)}
              key={`linha-${idx}`}
            >
              <Td>{linha}</Td>
              {colunas.map((_, colunaIdx) => {
                return (
                  <Td textAlign="center" key={`linha-${idx}-${colunaIdx}`}>
                    <Radio
                      disabled={!props.editable}
                      value={`[${idx},${colunaIdx}]`}
                    />
                  </Td>
                )
              })}
            </RadioGroup>
          ))}
        </Tbody>
      </Table>
    </ErrorWrapper>
  )
}
