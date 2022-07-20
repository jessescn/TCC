import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'

export default function EditForm() {
  const opcoesCampos = {
    paragrafo: { label: 'Parágrafo' },
    resposta: { label: 'Resposta' },
    data: { label: 'Data' },
    hora: { label: 'Hora' },
    ficheiro: { label: 'Ficheiro' },
    escolha_multipla: { label: 'Escolha Múltipla' },
    caixa_verificacao: { label: 'Campo Verificacão' },
    grelha_multipla: { label: 'Grelha Múltipla' },
    grelha_verificacao: { label: 'Grelha Verificacão' }
  }
  return (
    <Box borderColor="secondary.dark" borderWidth="1px" borderRadius="4px">
      <Flex justifyContent="flex-end" py="8px" px="16px">
        <Flex alignItems="center">
          <Text mr="8px" fontSize="14px" color="initial.black">
            obrigatório
          </Text>
          <Switch />
        </Flex>
      </Flex>
      <Stack direction="row" spacing="16px" p="16px">
        <Input placeholder="Pergunta" size="sm" />
        <Select size="sm" ml="8px">
          {Object.values(opcoesCampos).map(opcao => (
            <option key={opcao.label}>{opcao.label}</option>
          ))}
        </Select>
      </Stack>
      <Flex
        bgColor="secondary.default"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Flex>
          <Tooltip label="Remover campo">
            <IconButton
              aria-label=""
              variant="unstyled"
              icon={<Icon as={RiDeleteBinLine} />}
            />
          </Tooltip>
          <Tooltip label="Duplicar campo">
            <IconButton
              aria-label=""
              variant="unstyled"
              icon={<Icon as={HiOutlineDocumentDuplicate} />}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  )
}
