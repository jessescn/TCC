import { Flex } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { selectors, useSelector } from 'store'

export default function Footer() {
  const navigate = useNavigate()
  const refSubmitButtom = useRef<HTMLButtonElement>(null)
  const { watch } = useFormContext()

  const formularios: number[] = watch('formularios') || []

  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )
  const isLoading = useSelector(selectors.tipoProcedimento.isUpdatingData)

  const statusUpdate = useSelector(state => state.tipoProcedimento.statusUpdate)
  const statusCreate = useSelector(state => state.tipoProcedimento.statusCreate)

  const isTipoProcedimentoInvalido =
    (formularios || []).length === 0 || tipoProcedimento?.deleted

  useEffect(() => {
    if (statusUpdate === 'success' || statusCreate === 'success') {
      navigate('/tipo-procedimentos')
    }
  }, [statusUpdate, statusCreate])

  const handleSaveChanges = () => {
    refSubmitButtom?.current?.click()
  }

  const createButton = (
    <Button
      isLoading={isLoading}
      size="sm"
      type="submit"
      isDisabled={isTipoProcedimentoInvalido}
    >
      Criar
    </Button>
  )

  const updateButton = (
    <SimpleConfirmationButton
      style={{
        size: 'sm',
        isLoading: isLoading,
        isDisabled: isTipoProcedimentoInvalido
      }}
      content="Deseja mesmo salvar as alterações? Os procedimentos já respondidos podem ser afetados"
      onCancelButtonText="Cancelar"
      onConfirmButtonText="Confirmar"
      onConfirm={handleSaveChanges}
      title="Salvar Alterações"
    >
      Salvar
    </SimpleConfirmationButton>
  )

  const renderButton = () => {
    return tipoProcedimento ? updateButton : createButton
  }

  return (
    <Flex justifyContent="flex-end" mt="1rem">
      <Button
        customVariant="ghost"
        size="sm"
        mr="0.5rem"
        onClick={() => navigate('/tipo-procedimentos')}
      >
        Voltar
      </Button>
      {renderButton()}
      <button hidden={true} ref={refSubmitButtom} type={'submit'} />
    </Flex>
  )
}
