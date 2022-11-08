import { Flex } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { FormularioModel } from 'domain/models/formulario'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'store'

type Props = {
  formulario?: FormularioModel
}

export const Footer = ({ formulario }: Props) => {
  const navigate = useNavigate()
  const refSubmitButtom = useRef<HTMLButtonElement>(null)
  const { watch } = useFormContext()

  const campos = watch('campos', []) as any[]
  const statusCreate = useSelector(state => state.formulario.statusCreate)
  const statusUpdate = useSelector(state => state.formulario.statusUpdate)

  const isLoading = statusCreate === 'loading' || statusUpdate === 'loading'

  const triggerSubmit = () => {
    refSubmitButtom?.current?.click()
  }

  const createButton = (
    <Button
      fontSize="12px"
      size="sm"
      type="submit"
      isLoading={isLoading}
      isDisabled={(campos || []).length === 0}
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
        isLoading: isLoading
      }}
      content="Deseja mesmo salvar as alterações? Os procedimentos já respondidos podem ficar com respostas desatualizadas"
      onCancelButtonText="Cancelar"
      onConfirmButtonText="Confirmar"
      onConfirm={triggerSubmit}
      title="Salvar Alterações"
    >
      Salvar
    </SimpleConfirmationButton>
  )

  const renderButton = () => {
    return formulario ? updateButton : createButton
  }

  return (
    <Flex justifyContent="flex-end" mt="24px">
      <Button
        fontSize="12px"
        bgColor="initial.white"
        borderColor="primary.dark"
        _hover={{ bgColor: 'initial.white' }}
        borderWidth={1}
        color="primary.dark"
        size="sm"
        mr="8px"
        disabled={isLoading}
        onClick={() => navigate('/formularios')}
      >
        Voltar
      </Button>
      {renderButton()}
      <button hidden={true} ref={refSubmitButtom} type={'submit'} />
    </Flex>
  )
}
