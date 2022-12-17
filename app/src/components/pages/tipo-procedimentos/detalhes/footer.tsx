import { Button, Flex } from '@chakra-ui/react'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { selectors, useSelector } from 'store'

const Footer = () => {
  const navigate = useNavigate()
  const refSubmitButtom = useRef<HTMLButtonElement>(null)
  const { watch } = useFormContext()

  const formularios: number[] = watch('formularios') || []

  const tipoProcedimento = useSelector(
    selectors.tipoProcedimentoDetalhes.getTipoProcedimento
  )
  const statusUpdate = useSelector(state => state.tipoProcedimento.statusUpdate)
  const statusCreate = useSelector(state => state.tipoProcedimento.statusCreate)
  const isLoading = statusCreate === 'loading' || statusUpdate === 'loading'

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
      bgColor="primary.dark"
      color="initial.white"
      size="sm"
      _hover={{ bgColor: 'primary.default' }}
      type="submit"
      isDisabled={isTipoProcedimentoInvalido}
    >
      Criar
    </Button>
  )

  const updateButton = (
    <SimpleConfirmationButton
      style={{
        fontSize: '12px',
        size: 'sm',
        bgColor: 'primary.dark',
        color: 'initial.white',
        _hover: { bgColor: 'primary.default' },
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
    <Flex justifyContent="flex-end" mt="16px">
      <Button
        bgColor="initial.white"
        borderColor="primary.dark"
        borderWidth={1}
        color="primary.dark"
        size="sm"
        mr="8px"
        onClick={() => navigate('/tipo-procedimentos')}
      >
        Voltar
      </Button>
      {renderButton()}
      <button hidden={true} ref={refSubmitButtom} type={'submit'} />
    </Flex>
  )
}

export default Footer
