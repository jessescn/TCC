import {
  Box,
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
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoGrelhaMultipla>

export function CampoGrelhaMultipla({
  onUpdateResposta,
  formulario,
  ...props
}: Props) {
  const campo = useGetValorCampo(formulario, props.ordem)

  const currentValue: number[][] = campo?.valor || []

  const { colunas, linhas } = props.configuracao_campo

  function handleChange(value: string) {
    const parsedValue: number[] = JSON.parse(value)

    const idx = currentValue.findIndex(value => value[0] === parsedValue[0])

    if (idx === -1) {
      onUpdateResposta({
        ordem: props.ordem,
        valor: [...currentValue, parsedValue]
      })
      return
    }

    const copyValue = [...currentValue]

    copyValue.splice(idx, 1, parsedValue)
    onUpdateResposta({
      ordem: props.ordem,
      valor: copyValue
    })
  }

  function getCurrentValueByRow(rowIdx: number) {
    const value =
      campo?.valor.find((valor: number[]) => valor[0] === rowIdx) || []

    return `[${value[0]},${value[1]}]`
  }

  return (
    <Box>
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
              defaultValue={getCurrentValueByRow(idx)}
              key={`linha-${idx}`}
            >
              <Td>{linha}</Td>
              {colunas.map((_, colunaIdx) => (
                <Td textAlign="center" key={`linha-${idx}-${colunaIdx}`}>
                  <Radio
                    disabled={!props.editable}
                    value={`[${idx},${colunaIdx}]`}
                  />
                </Td>
              ))}
            </RadioGroup>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
