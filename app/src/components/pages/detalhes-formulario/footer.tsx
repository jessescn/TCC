import { Flex } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'store'

export const Footer = () => {
  const navigate = useNavigate()
  const { watch } = useFormContext()

  const campos = watch('campos', []) as any[]
  const status = useSelector(state => state.formulario.statusCreate)
  const isLoading = status === 'loading'

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
      <Button
        fontSize="12px"
        size="sm"
        type="submit"
        isLoading={isLoading}
        isDisabled={(campos || []).length === 0}
      >
        Salvar
      </Button>
    </Flex>
  )
}
