import { Button, Flex } from '@chakra-ui/react'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'store'

const Footer = () => {
  const navigate = useNavigate()
  const refSubmitButtom = useRef<HTMLButtonElement>(null)

  const statusUpdate = useSelector(state => state.userDetalhes.statusUpdate)
  const isLoading = statusUpdate === 'loading'

  useEffect(() => {
    if (statusUpdate === 'success') {
      navigate('/coordenacao/usuarios')
    }
  }, [statusUpdate])

  const triggerSubmit = () => {
    refSubmitButtom?.current?.click()
  }

  return (
    <Flex justifyContent="flex-end" mt="32px">
      <Button
        bgColor="initial.white"
        borderColor="primary.dark"
        borderWidth={1}
        color="primary.dark"
        size="sm"
        mr="8px"
        onClick={() => navigate('/coordenacao/usuarios')}
      >
        Voltar
      </Button>
      <SimpleConfirmationButton
        style={{
          fontSize: '12px',
          size: 'sm',
          bgColor: 'primary.dark',
          color: 'initial.white',
          _hover: { bgColor: 'primary.default' },
          isLoading: isLoading
        }}
        content="Deseja mesmo salvar as alterações?"
        onCancelButtonText="Cancelar"
        onConfirmButtonText="Confirmar"
        onConfirm={triggerSubmit}
        title="Salvar Alterações"
      >
        Salvar
      </SimpleConfirmationButton>
      <button hidden={true} ref={refSubmitButtom} type={'submit'} />
    </Flex>
  )
}

export default Footer