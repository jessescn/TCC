import { Stack, Text } from '@chakra-ui/react'
import { VotoProcedimento } from 'domain/models/procedimento'

type Props = {
  votos: VotoProcedimento[]
}

const VotosLista = ({ votos }: Props) => {
  return (
    <Stack spacing="4px" fontSize="12px">
      {votos.map(voto => (
        <Text key={voto.autor}>
          Fulano votou{' '}
          <Text
            as="span"
            fontWeight="bold"
            color={voto.aprovado ? 'info.success' : 'info.error'}
          >
            {voto.aprovado ? 'SIM' : 'NÃO'}
          </Text>
        </Text>
      ))}
    </Stack>
  )
}

export default VotosLista
