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
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { ErrorWrapper } from './error-wrapper'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoCaixaVerificacao>

export function CampoCaixaVerificacao({
  onUpdateResposta,
  formulario,
  ...props
}: Props) {
  const campo = useGetValorCampo(formulario, props.ordem)

  const { setError, clearErrors } = useFormContext()
  const { opcoes, outro } = props.configuracao_campo
  const fieldName = `field${props.ordem}`

  const [valorOutro, setValorOutro] = useState('')

  function handleChange(value: any) {
    const valor = value === 'outro' ? valorOutro : value
    onUpdateResposta({ ordem: props.ordem, valor })
  }

  useEffect(() => {
    if (!props.obrigatorio) return

    const isInvalid = ((campo?.valor as any[]) || []).length === 0

    if (isInvalid) {
      setError(fieldName, { message: 'Selecione ao menos uma opcão' })
    } else {
      clearErrors(fieldName)
    }
  }, [campo])

  return (
    <ErrorWrapper fieldName={fieldName}>
      <CampoParagrafo {...props} />
      <Box mt="16px">
        <CheckboxGroup
          onChange={handleChange}
          defaultValue={campo?.valor || []}
        >
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Checkbox disabled={!props.editable} key={opcao} value={opcao}>
                {opcao}
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
