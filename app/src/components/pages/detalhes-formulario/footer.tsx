import { Button, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'store'

export const Footer = () => {
  const navigate = useNavigate()

  const status = useSelector(state => state.formulario.statusCreate)
  const isLoading = status === 'loading'

  return (
    <Flex justifyContent="flex-end" mt="8px">
      <Button
        textAlign="center"
        bgColor="initial.white"
        borderColor="primary.dark"
        borderWidth={1}
        color="primary.dark"
        size="sm"
        mr="8px"
        disabled={isLoading}
        onClick={() => navigate('/formularios')}
      >
        Voltar
      </Button>
      <Button
        textAlign="center"
        bgColor="primary.dark"
        color="initial.white"
        display="block"
        size="sm"
        type="submit"
        isLoading={isLoading}
      >
        Salvar
      </Button>
    </Flex>
  )
}
