import {
  Box,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { KeyboardEvent, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { actions, selectors, store, useSelector } from 'store'
import Comentario from './comentario'

type Props = {
  procedimento: ProcedimentoModel
}

export default function ListaComentarios({ procedimento }: Props) {
  const [conteudo, setConteudo] = useState('')

  const status = useSelector(
    state => state.procedimentoDetalhes.statusNewComentario
  )
  const comentarios = useSelector(selectors.procedimentoDetalhes.getComentarios)
  const isLoading = status === 'loading'

  const handleComment = () => {
    store.dispatch(
      actions.procedimentoDetalhes.comment({
        conteudo,
        procedimento: procedimento.id
      })
    )
    setConteudo('')
  }

  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleComment()
    }
  }

  return (
    <Box p="0.5rem" height="100%">
      <Text fontWeight="bold" mb="1.5rem">
        Comentários
      </Text>
      <Stack spacing="1rem" overflowY="auto" height="88%" w="100%">
        {comentarios.length === 0 && (
          <Text fontSize="sm">Nenhum comentário</Text>
        )}
        {comentarios.map(comentario => (
          <Comentario key={`${comentario.id}`} comentario={comentario} />
        ))}
      </Stack>
      <InputGroup mt="0.5rem">
        <Input
          w="100%"
          size="sm"
          borderWidth="1px"
          borderRadius="sm"
          disabled={isLoading}
          _focus={{ boxShadow: 'none', borderColor: 'initial.black' }}
          _hover={{ borderColor: 'initial.black' }}
          value={conteudo}
          onKeyDown={handleKeydown}
          onChange={e => setConteudo(e.target.value)}
          borderColor="secondary.default"
          placeholder="Digite um novo comentário"
        />
        <InputRightElement h={9}>
          <IconButton
            size="md"
            onClick={handleComment}
            isDisabled={conteudo.trim() === ''}
            _focus={{ boxShadow: 'none' }}
            _active={{ bgColor: 'transparent' }}
            bgColor="transparent"
            _hover={{ bgColor: 'transparent', fontSize: 'sm' }}
            aria-label="send message"
            icon={<Icon as={FiSend} color="primary.dark" />}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
