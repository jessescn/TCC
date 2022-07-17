import { Box, Checkbox, CheckboxGroup, Flex, Input } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoCaixaVerificacao } from 'domain/types/campo-tipos'
import { BaseCampoProps } from '.'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoCaixaVerificacao>

export function CampoCaixaVerificacao(props: Props) {
  const { register, ...paragrafoProps } = props
  const { opcoes, outro } = props.configuracao_campo

  return (
    <Box>
      <CampoParagrafo {...paragrafoProps} />
      <CheckboxGroup
        {...register}
        onChange={value => register.onChange({ target: { value } })}
      >
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
      </CheckboxGroup>
    </Box>
  )
}
