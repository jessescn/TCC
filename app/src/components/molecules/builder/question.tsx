import { Box, Flex, Input, Select } from '@chakra-ui/react'

const Question = () => {
  return (
    <Box
      w="100%"
      p={8}
      boxShadow="md"
      borderWidth="1px"
      borderColor="secondary.default"
    >
      <Flex>
        <Input value="Pergunta 1" mr={8} />
        <Select>
          <option value="">Resposta curta</option>
          <option value="">Resposta longa</option>
        </Select>
      </Flex>
    </Box>
  )
}

export default Question
