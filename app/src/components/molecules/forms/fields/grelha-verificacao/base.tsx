import {
  Checkbox,
  CheckboxGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoGrelhaVerificacao } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoGrelhaVerificacao>

export function BaseCampoGrelhaVerificacao({
  onChange,
  isInvalid,
  campo,
  ...props
}: Props) {
  const currentValue: string[][] = campo?.valor || []

  const { colunas, linhas } = props.configuracao_campo

  function getCurrentValueIdxByRow(row: number) {
    return currentValue.findIndex(v => {
      return JSON.parse(v[0])[0] === row
    })
  }

  function getCurrentValuesByRow(row: number) {
    const idx = getCurrentValueIdxByRow(row)

    return idx === -1 ? [] : currentValue[idx]
  }

  function appendNewValue(value: string[]) {
    onChange({
      ordem: props.ordem,
      valor: [...currentValue, value]
    })
  }

  function updateCurrentValue(value: string[], idx: number) {
    const copy = JSON.parse(JSON.stringify(currentValue)) as string[][]

    if (value.length === 0) {
      copy.splice(idx, 1)
    } else {
      copy.splice(idx, 1, value)
    }

    onChange({
      ordem: props.ordem,
      valor: copy
    })
  }

  function handleChange(value: string[], row: number) {
    const currentRowIdx = getCurrentValueIdxByRow(row)

    if (currentRowIdx === -1) {
      appendNewValue(value)
    } else {
      updateCurrentValue(value, currentRowIdx)
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
            <Th></Th>
            {colunas.map((coluna, idx) => (
              <Th textAlign="center" key={`coluna${idx}`}>
                {coluna}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {linhas.map((linha, idx) => (
            <CheckboxGroup
              key={`${campo?.ordem}-linha-${idx}`}
              onChange={(value: string[]) => handleChange(value, idx)}
              value={getCurrentValuesByRow(idx)}
            >
              <Tr>
                <Td>{linha}</Td>
                {colunas.map((_, colunaIdx) => (
                  <Td
                    textAlign="center"
                    key={`${campo?.ordem}-linha-${idx}-${colunaIdx}`}
                  >
                    <Checkbox
                      disabled={!props.editable}
                      value={`[${idx},${colunaIdx}]`}
                    />
                  </Td>
                ))}
              </Tr>
            </CheckboxGroup>
          ))}
        </Tbody>
      </Table>
    </ErrorWrapper>
  )
}
