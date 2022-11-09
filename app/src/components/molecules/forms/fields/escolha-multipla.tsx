import { Box, Flex, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoEscolhaMultipla } from 'domain/types/campo-tipos'
import { useGetValorCampo } from 'hooks/useGetValorCampo'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { BaseCampoProps } from '.'
import { ErrorWrapper } from './error-wrapper'
import { CampoParagrafo } from './paragrafo'

type Props = BaseCampoProps & CampoFormulario<CampoTipoEscolhaMultipla>

export function CampoEscolhaMultipla({
  onUpdateResposta,
  formulario,
  ...props
}: Props) {
  const [valorOutro, setValorOutro] = useState('')
  const { setError, clearErrors } = useFormContext()
  const campo = useGetValorCampo(formulario, props.ordem)

  const fieldName = `field${props.ordem}`

  const { opcoes, outro } = props.configuracao_campo

  function handleChange(value: any) {
    const valor = value === 'outro' ? valorOutro : value

    onUpdateResposta({ ordem: props.ordem, valor })
  }

  useEffect(() => {
    if (!props.obrigatorio) return

    const isInvalid = campo === undefined

    if (isInvalid) {
      setError(fieldName, { message: 'Selecione ao menos uma opção' })
    } else {
      clearErrors(fieldName)
    }
  }, [campo])

  return (
    <ErrorWrapper fieldName={fieldName}>
      <CampoParagrafo {...props} />
      <Box mt="16px">
        <RadioGroup onChange={handleChange}>
          <Stack spacing="16px">
            {opcoes.map(opcao => (
              <Radio
                isDisabled={!props.editable}
                value={opcao}
                key={opcao}
                display="block"
              >
                {opcao}
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
