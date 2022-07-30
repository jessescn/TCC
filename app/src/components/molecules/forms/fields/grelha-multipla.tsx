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
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoGrelhaMultipla>

export function CampoGrelhaMultipla(props: Props) {
  const { setValue, watch } = useFormContext()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onUpdateResposta, ...paragrafoProps } = props

  const currentValue: number[][] = watch(`resposta`) || []

  const { colunas, linhas } = props.configuracao_campo

  function handleChange(value: string) {
    const parsedValue: number[] = JSON.parse(value)

    const idx = currentValue.findIndex(value => value[0] === parsedValue[0])

    if (idx === -1) {
      setValue(`campo ${props.ordem}`, [...currentValue, parsedValue])
      return
    }

    currentValue.splice(idx, 1, parsedValue)
    setValue(`campo ${props.ordem}`, currentValue)
  }

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
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
            <RadioGroup as="tr" onChange={handleChange} key={`linha-${idx}`}>
              <Td key={`linha-${idx}`}>{linha}</Td>
              {colunas.map((_, colunaIdx) => (
                <Td textAlign="center" key={`linha-${idx}-${colunaIdx}`}>
                  <Radio value={`[${idx},${colunaIdx}]`} />
                </Td>
              ))}
            </RadioGroup>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
