import { Box, Stack, Text } from '@chakra-ui/react'
import { ImInsertTemplate } from 'react-icons/im'
import InfoCard from '../info-card'

export default function FormulariosInfoCard() {
  return (
    <InfoCard icon={ImInsertTemplate} title="Formulários">
      <Stack spacing="0.4rem" fontSize="sm">
        <Text>
          Os
          <Text mx="0.25rem" as="span" fontWeight="bold">
            Formulários
          </Text>
          são um conjunto de diferentes campos que devem ser preenchidos pelos
          usuários ao abrir um novo procedimento.
        </Text>
        <Text>
          Como os Formulários são independentes, é possível utilizar o mesmo
          para mais de um Tipo de Procedimento ao mesmo tempo.
        </Text>
        <Box>
          <Text my="1rem" fontWeight="bold">
            Template
          </Text>
          <Text>
            Ao criar/editar um Formulário, é possível cadastrar um template. Ele
            servirá como base para criação do PDF que será encaminhado junto a
            secretaria. No template é possível vincular os campos do formulário,
            permitindo que as respostas do usuário sejam inseridos no template
            na geração do PDF.
          </Text>
        </Box>
      </Stack>
    </InfoCard>
  )
}
