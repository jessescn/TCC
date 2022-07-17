import {
  Box,
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
import { CampoParagrafo } from './patagrafo'

type Props = CampoFormulario<CampoTipoGrelhaVerificacao>

export function CampoGrelhaVerificacao(props: Props) {
  const { colunas, linhas } = props.configuracao_campo

  return (
    <Box>
      <CampoParagrafo {...props} />
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            {colunas.map(coluna => (
              <Th textAlign="center">{coluna}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {linhas.map(linha => (
            <CheckboxGroup>
              <Tr>
                <Td>{linha}</Td>
                {colunas.map(() => (
                  <Td textAlign="center">
                    <Checkbox />
                  </Td>
                ))}
              </Tr>
            </CheckboxGroup>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
