import {
  Box,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react'
import {
  CampoFormulario,
  CampoTipoEscolhaMultipla
} from 'domain/models/formulario'
import { useState } from 'react'
import { BaseCampoProps } from '..'
import { ErrorWrapper } from '../error-wrapper'
import { CampoParagrafo } from '../paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoEscolhaMultipla>

export function BaseCampoEscolhaMultipla({
  onChange,
  campo,
  isInvalid,
  ...props
}: Props) {
  const [valorOutro, setValorOutro] = useState('')

  const { opcoes, outro } = props.configuracao_campo

  function handleChange(value: any) {
    const valor = value === 'outro' ? valorOutro : value

    onChange({ ordem: props.ordem, valor })
  }

  return (
    <ErrorWrapper isInvalid={isInvalid} message="Selecione ao menos uma opção">
      <CampoParagrafo {...props} />
      <Box mt="16px">
        <RadioGroup onChange={handleChange} defaultValue={campo?.valor}>
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Radio
                isDisabled={!props.editable}
                value={opcao}
                key={opcao}
                display="flex"
              >
                <Text as="span" fontSize="sm">
                  {opcao}
                </Text>
              </Radio>
            ))}
            {outro && (
              <Flex>
                <Radio value="outro" isDisabled={!props.editable}>
                  Outro:
                </Radio>
                <Input
                  disabled={!props.editable}
                  ml="16px"
                  variant="unstyled"
                  borderBottom="1px solid #000"
                  borderRadius={0}
                  onChange={ev => setValorOutro(ev.target.value)}
                  value={valorOutro}
                />
              </Flex>
            )}
          </Stack>
        </RadioGroup>
      </Box>
    </ErrorWrapper>
  )
}
