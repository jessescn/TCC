import { Box, Checkbox, CheckboxGroup, Flex, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoCaixaVerificacao } from 'domain/types/campo-tipos'
import { CampoParagrafo } from './patagrafo'

type Props = CampoFormulario<CampoTipoCaixaVerificacao>

export function CampoCaixaVerificacao(props: Props) {
  const { opcoes, outro } = props.configuracao_campo

  return (
    <Box>
      <CampoParagrafo {...props} />
      <CheckboxGroup>
        {opcoes.map(opcao => (
          <Checkbox>{opcao}</Checkbox>
        ))}
        {outro && (
          <Flex>
            <Checkbox>Outro:</Checkbox>
            <Input
              ml="16px"
              variant="unstyled"
              borderBottom="1px solid #000"
              borderRadius={0}
            />
          </Flex>
        )}
      </CheckboxGroup>
    </Box>
  )
}
