import {
  Box,
  Center,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react'
import { LoadingPage } from 'components/molecules/loading'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { KeyboardEvent, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiSend } from 'react-icons/fi'
import { actions, selectors, store, useSelector } from 'store'
import Comentario from './comentario'

type Props = {
  procedimento: ProcedimentoModel
  onClose: () => void
}

export default function ListaComentarios({ procedimento, onClose }: Props) {
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
    <Box py="0.5rem" height="100%">
      <Flex height="40px" alignItems="center">
        <IconButton
          aria-label="close comentarios"
          _focus={{ boxShadow: 'none' }}
          bgColor="transparent"
          _hover={{ bgColor: 'transparent' }}
          _active={{ bgColor: 'transparent' }}
          icon={<Icon as={AiOutlineClose} />}
          onClick={onClose}
        />
        <Text fontWeight="bold">Comentários</Text>
      </Flex>
      {isLoading ? (
        <Center height="85%">
          <LoadingPage default />
        </Center>
      ) : (
        <Stack
          spacing="1rem"
          overflowY="auto"
          height="calc(100% - 70px)"
          w="100%"
          pr="0.5rem"
          pt="1.25rem"
          pb="0.5rem"
        >
          {comentarios.length === 0 && (
            <Text fontSize="sm">Nenhum comentário</Text>
          )}
          {comentarios.map(comentario => (
            <Comentario key={`${comentario.id}`} comentario={comentario} />
          ))}
        </Stack>
      )}
      <InputGroup height="30px">
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
