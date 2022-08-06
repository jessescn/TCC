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
import { ComentarioModel } from 'domain/models/comentario'
import { ProcessoModel } from 'domain/models/processo'
import { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { ComentarioService } from 'services/comentario'
import { ProcessoService } from 'services/processos'
import Comment from './comment'

type Props = {
  processo: ProcessoModel
}

const Comments = ({ processo }: Props) => {
  const [comentarios, setComentarios] = useState<ComentarioModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')

  const handleComment = async () => {
    setIsLoading(true)
    const response = await ComentarioService.create({
      conteudo: value,
      processo: processo.id
    })

    const novoComentario = response.data as any

    console.log(novoComentario)

    setComentarios(prev => [...prev, novoComentario])
    setIsLoading(false)
    setValue('')
  }

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleComment()
    }
  }

  useEffect(() => {
    const getCommentsByProcesso = async () => {
      try {
        const response = await ProcessoService.comments(processo.id)

        const comentarios = response.data as any

        return comentarios
      } catch (error) {
        console.error(error)
      }
    }

    getCommentsByProcesso().then(data => setComentarios(data))
  }, [])

  return (
    <Box py="8px" height="100%">
      <Text fontWeight="bold" mb="20px">
        Comentários
      </Text>
      <Stack spacing="16px" overflowY="auto" height="90%" w="100%" pr="8px">
        {comentarios.length === 0 && (
          <Text fontSize="12px">Nenhum comentário</Text>
        )}
        {comentarios.map(comentario => (
          <Comment comentario={comentario} />
        ))}
      </Stack>
      <InputGroup mt="8px">
        <Input
          w="100%"
          size="xs"
          disabled={isLoading}
          _focus={{ boxShadow: 'none' }}
          value={value}
          onKeyDown={handleEnter}
          onChange={e => setValue(e.target.value)}
          borderColor="#000"
          borderWidth="1px"
          placeholder="Digite um comentário"
          bgColor="initial.white"
        />
        <InputRightElement h={6}>
          <IconButton
            onClick={handleComment}
            size="xs"
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
