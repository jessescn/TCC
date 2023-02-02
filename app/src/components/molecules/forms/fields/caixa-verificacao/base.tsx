import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import {
  CampoFormulario,
  CampoTipoCaixaVerificacao
} from 'domain/models/formulario'
import { useState } from 'react'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoCaixaVerificacao>

export function BaseCampoCaixaVerificacao({
  onChange,
  campo,
  isInvalid,
  ...props
}: Props) {
  const { opcoes, outro } = props.configuracao_campo

  const [valorOutro, setValorOutro] = useState('')

  function handleChange(value: any) {
    const valor = value === 'outro' ? valorOutro : value
    onChange({ ordem: props.ordem, valor })
  }

  return (
    <ErrorWrapper isInvalid={isInvalid}>
      <CampoParagrafo {...props} />
      <Box mt="16px">
        <CheckboxGroup
          onChange={handleChange}
          defaultValue={campo?.valor || []}
        >
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Checkbox disabled={!props.editable} key={opcao} value={opcao}>
                <Text as="span" fontSize="sm">
                  {opcao}
                </Text>
              </Checkbox>
            ))}
            {outro && (
              <Flex>
                <Checkbox disabled={!props.editable} value={'outro'}>
                  Outro:
                </Checkbox>
                <Input
                  ml="16px"
                  disabled={!props.editable}
                  variant="unstyled"
                  borderBottom="1px solid #000"
                  borderRadius={0}
                  value={valorOutro}
                  onChange={ev => setValorOutro(ev.target.value)}
                />
              </Flex>
            )}
          </Stack>
        </CheckboxGroup>
      </Box>
    </ErrorWrapper>
  )
}
