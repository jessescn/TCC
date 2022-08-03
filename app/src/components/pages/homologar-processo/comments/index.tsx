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
import { ProcessoModel } from 'domain/models/processo'
import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import Comment from './comment'

type Props = {
  processo: ProcessoModel
}

const Comments = ({ processo }: Props) => {
  const [value, setValue] = useState('')

  const handleComment = () => {
    setValue('')
    return null // TODO: call action to create comment
  }

  return (
    <Box py="8px" height="100%">
      <Text fontWeight="bold" mb="20px">
        Comentários
      </Text>
      <Stack spacing="16px" overflowY="auto" height="90%" w="100%" pr="8px">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Stack>
      <InputGroup mt="8px">
        <Input
          w="100%"
          size="xs"
          _focus={{ boxShadow: 'none' }}
          value={value}
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
