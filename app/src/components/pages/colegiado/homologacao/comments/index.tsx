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
import Comment from './comment'

type Props = {
  procedimento: ProcedimentoModel
}

const Comments = ({ procedimento }: Props) => {
  const [value, setValue] = useState('')

  const comentarios = useSelector(selectors.procedimentoDetalhes.getComentarios)
  const status = useSelector(
    state => state.procedimentoDetalhes.statusNewComentario
  )
  const isLoading = status === 'loading'

  const handleComment = () => {
    store.dispatch(
      actions.procedimentoDetalhes.comment({
        conteudo: value,
        procedimento: procedimento.id
      })
    )
    setValue('')
  }

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleComment()
    }
  }

  return (
    <Box py="8px" height="100%">
      <Text fontWeight="bold" mb="20px">
        Comentários
      </Text>
      <Stack spacing="16px" overflowY="auto" height="85%" w="100%" pr="8px">
        {comentarios.length === 0 && (
          <Text fontSize="12px">Nenhum comentário</Text>
        )}
        {comentarios.map(comentario => (
          <Comment key={`${comentario.id}`} comentario={comentario} />
        ))}
      </Stack>
      <InputGroup mt="8px">
        <Input
          w="100%"
          size="sm"
          disabled={isLoading}
          _focus={{ boxShadow: 'none' }}
          value={value}
          onKeyDown={handleEnter}
          onChange={e => setValue(e.target.value)}
          borderColor="#000"
          borderWidth="1px"
          borderRadius="4px"
          placeholder="Digite um comentário"
          bgColor="initial.white"
        />
        <InputRightElement h={8}>
          <IconButton
            onClick={handleComment}
            size="md"
            _focus={{ boxShadow: 'none' }}
            _active={{ bgColor: 'transparent' }}
            bgColor="transparent"
            _hover={{ bgColor: 'transparent', fontSize: '14px' }}
            aria-label="send message"
            icon={<Icon as={FiSend} color="primary.dark" />}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export default Comments
