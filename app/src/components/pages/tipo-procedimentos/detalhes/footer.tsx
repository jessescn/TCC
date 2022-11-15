import { Button, Flex } from '@chakra-ui/react'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

type Props = {
  tipoProcedimento?: TipoProcedimentoModel
}

const Footer = ({ tipoProcedimento }: Props) => {
  const navigate = useNavigate()
  const refSubmitButtom = useRef<HTMLButtonElement>(null)
  const { watch } = useFormContext()

  const formularios = watch('formularios', []) as number[]

  const statusUpdate = useSelector(state => state.tipoProcedimento.statusUpdate)
  const statusCreate = useSelector(state => state.tipoProcedimento.statusCreate)
  const isLoading = statusCreate === 'loading' || statusUpdate === 'loading'

  const isTipoProcedimentoInvalido =
    (formularios || []).length === 0 || tipoProcedimento?.deleted

  useEffect(() => {
    if (statusUpdate === 'success' || statusCreate === 'success') {
      store.dispatch(actions.tipoProcedimento.resetStatus())

      navigate('/tipo-procedimentos')
    }
  }, [statusUpdate, statusCreate])

  const triggerSubmit = () => {
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
      onConfirm={triggerSubmit}
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
