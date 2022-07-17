import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  Stack
} from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoCaixaVerificacao } from 'domain/types/campo-tipos'
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoCaixaVerificacao>

export function CampoCaixaVerificacao(props: Props) {
  const { setValue } = useFormContext()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, ...paragrafoProps } = props
  const { opcoes, outro } = props.configuracao_campo

  function handleChange(value: any) {
    setValue(`campo ${props.ordem}`, value)
  }

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <Box mt="16px">
        <CheckboxGroup onChange={handleChange}>
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Checkbox key={opcao} value={opcao}>
                {opcao}
              </Checkbox>
            ))}
            {outro && (
              <Flex>
                <Checkbox value={'outro'}>Outro:</Checkbox>
                <Input
                  ml="16px"
                  variant="unstyled"
                  borderBottom="1px solid #000"
                  borderRadius={0}
                />
              </Flex>
            )}
          </Stack>
        </CheckboxGroup>
      </Box>
    </Box>
  )
}
