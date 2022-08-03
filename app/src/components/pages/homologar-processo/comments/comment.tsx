import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

const Comment = () => {
  return (
    <Flex w="100%">
      <Avatar size="xs" mr="12px" />
      <Box bgColor="initial.white">
        <Flex alignItems="center">
          <Text fontSize="10px" fontWeight="bold" mr="8px">
            Jessé Souza
          </Text>
          <Text fontSize="10px" color="secondary.dark">
            jesse.neto@ccc.ufcg.edu.br
          </Text>
        </Flex>
        <Text
          fontSize="10px"
          my="8px"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
          euismod cursus. Donec id rhoncus erat. In condimentum euismod purus ac
          eleifend. Aliquam erat volutpat
        </Text>
        <Flex justifyContent="flex-end">
          <Text fontSize="10px" color="secondary.dark">
            07/12/2020 - 09:28
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Comment
