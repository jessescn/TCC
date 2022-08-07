import { Box, Flex, Icon, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { CampoFormulario } from 'domain/models/formulario'
import { CampoTipoParagrafo } from 'domain/types/campo-tipos'
import { FiAlertTriangle } from 'react-icons/fi'

type Props = CampoFormulario<CampoTipoParagrafo> & {
  isInvalido?: boolean
  onInvalide?: (ordem: number) => void
}

export function CampoParagrafo({
  obrigatorio,
  configuracao_campo,
  isInvalido,
  onInvalide,
  ordem
}: Props) {
  const { descricao, titulo } = configuracao_campo

  return (
    <Box>
      {titulo && (
        <Flex w="100%" justifyContent="space-between">
          <Text fontWeight="bold" mb="8px" fontSize="14px">
            {titulo}
            <Text ml="4px" as="span" color="info.error" hidden={!obrigatorio}>
              *
            </Text>
          </Text>
          <Flex alignItems="center">
            {isInvalido && (
              <Text
                fontSize="12px"
                fontWeight="bold"
                as="span"
                ml="8px"
                color="info.error"
                mr="8px"
              >
                CORREÇÃO PENDENTE
              </Text>
            )}
            {onInvalide && (
              <Tooltip label="Apontar correção">
                <IconButton
                  bgColor="initial.white"
                  borderWidth="1px"
                  borderColor="info.error"
                  size="sm"
                  _hover={{ bgColor: 'initial.white' }}
                  onClick={() => onInvalide(ordem)}
                  aria-label=""
                  icon={<Icon as={FiAlertTriangle} color="info.error" />}
                />
              </Tooltip>
            )}
          </Flex>
        </Flex>
      )}
      {descricao && <Text fontSize="12px">{descricao}</Text>}
    </Box>
  )
}
