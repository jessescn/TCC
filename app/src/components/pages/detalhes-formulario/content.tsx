import { FormularioModel } from 'domain/models/formulario'
import {
  Box,
  Button,
  Collapse,
  Divider,
  Flex,
  Icon,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { GrDrag } from 'react-icons/gr'
import EditForm from './edit-form'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'

type Props = {
  formulario?: FormularioModel
}

export default function Content({ formulario }: Props) {
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
        <Button
          bgColor="primary.dark"
          color="initial.white"
          display="block"
          size="sm"
          mb="8px"
        >
          Salvar
        </Button>
      </Flex>
      <Collapse in={showGeneral} animateOpacity>
        <Stack spacing="16px">
          <Box alignItems="center">
            <Text fontSize="14px" mb="8px" fontWeight="bold">
              Nome:
            </Text>
            <Input size="sm" value={formulario?.nome} />
          </Box>
          <Box>
            <Text fontSize="14px" mb="8px" fontWeight="bold">
              Descricão:
            </Text>
            <Textarea size="sm" value={formulario?.descricao} />
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
    </Box>
  )
}
