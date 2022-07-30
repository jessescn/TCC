import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import { FormularioModel } from 'domain/models/formulario'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import EditForm from './edit-form'

type Props = {
  formulario?: FormularioModel
}

export default function Content({ formulario }: Props) {
  const navigate = useNavigate()
  const {
    register,
    formState: { isDirty }
  } = useFormContext()

  const [showGeneral, setShowGeneral] = useState(true)
  const [showForm, setShowForm] = useState(true)

  const handleToggleGeneral = () => setShowGeneral(!showGeneral)
  const handleToggleForm = () => setShowForm(!showForm)

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Button
          display="block"
          variant="unstyled"
          px={0}
          mb="8px"
          onClick={handleToggleGeneral}
          _focus={{ boxShadow: 'none' }}
          leftIcon={
            <Icon
              as={showGeneral ? MdOutlineExpandLess : MdOutlineExpandMore}
            />
          }
        >
          Configuracões Gerais
        </Button>
      </Flex>
      <Collapse in={showGeneral} animateOpacity>
        <Stack spacing="16px">
          <Box alignItems="center">
            <Text fontSize="14px" mb="8px" fontWeight="bold">
              Nome:
            </Text>
            <Input
              size="sm"
              defaultValue={formulario?.nome}
              {...register('nome')}
            />
          </Box>
          <Box>
            <Text fontSize="14px" mb="8px" fontWeight="bold">
              Descricão:
            </Text>
            <Textarea
              size="sm"
              defaultValue={formulario?.descricao}
              {...register('descricao')}
            />
          </Box>
        </Stack>
      </Collapse>
      <Button
        variant="unstyled"
        px={0}
        mb="8px"
        mt="24px"
        onClick={handleToggleForm}
        _focus={{ boxShadow: 'none' }}
        leftIcon={
          <Icon as={showForm ? MdOutlineExpandLess : MdOutlineExpandMore} />
        }
      >
        Configuracão dos Campos
      </Button>
      <Collapse in={showForm} animateOpacity>
        <EditForm />
      </Collapse>
      <Flex justifyContent="flex-end">
        <Button
          bgColor="initial.white"
          borderColor="primary.dark"
          borderWidth={1}
          color="primary.dark"
          size="sm"
          mr="8px"
          onClick={() => navigate('/formularios')}
        >
          Voltar
        </Button>
        <Button
          bgColor="primary.dark"
          color="initial.white"
          display="block"
          size="sm"
          disabled={!isDirty}
          type="submit"
        >
          Salvar
        </Button>
      </Flex>
    </Box>
  )
}
