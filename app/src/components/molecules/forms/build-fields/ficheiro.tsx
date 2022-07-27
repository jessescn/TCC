import { Flex, Input, Stack, Text } from '@chakra-ui/react'
import { BaseBuildFieldProps } from '.'

type ConfiguracaoCampoFicheiro = {
  quantidade_arquivos?: number
  tamanho_maximo?: number
}

export default function FicheiroBuilder({
  onUpdate,
  campo
}: BaseBuildFieldProps) {
  // TODO: aplicar um debounce nos inputs para não dar trigger a cada mudanca no input
  const handleUpdateCampo = (alteracao: Partial<ConfiguracaoCampoFicheiro>) => {
    onUpdate({
      ...campo,
      configuracao_campo: { ...campo.configuracao_campo, ...alteracao }
    })
  }

  return (
    <Stack spacing="16px">
      <Flex alignItems="center">
        <Text mr="8px" fontSize="14px">
          Número máximo de arquivos
        </Text>
        <Input
          size="sm"
          type="number"
          defaultValue={1}
          value={campo.configuracao_campo?.quantidade_arquivos || 1}
          onChange={ev =>
            handleUpdateCampo({ quantidade_arquivos: Number(ev.target.value) })
          }
          max={15}
          min={0}
          maxW="fit-content"
        />
      </Flex>
      <Flex alignItems="center">
        <Text mr="8px" fontSize="14px">
          Tamanho máximo dos arquivos (MB)
        </Text>
        <Input
          size="sm"
          type="number"
          defaultValue={1}
          value={campo.configuracao_campo?.tamanho_maximo || 1}
          onChange={ev =>
            handleUpdateCampo({ tamanho_maximo: Number(ev.target.value) })
          }
          max={1000}
          min={1}
          maxW="fit-content"
        />
      </Flex>
    </Stack>
  )
}
