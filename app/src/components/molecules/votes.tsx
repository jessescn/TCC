import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

export type VoteOption = 'yes' | 'no'

type Props = {
  currentVote?: VoteOption
  onVote: (option: VoteOption) => void
  votes: {
    yes: number
    no: number
  }
}

const Votes = ({ votes, currentVote, onVote }: Props) => {
  const isPositiveVote = currentVote === 'yes'
  const isNegativeVote = currentVote === 'no'

  const handleVote = (vote: VoteOption) => {
    if (currentVote === vote) {
      onVote('' as VoteOption)
      return
    }

    onVote(vote)
  }

  return (
    <Flex alignItems="center">
      <Flex>
        <Flex alignItems="center" mr="8px">
          <Text fontWeight="bold" mr="4px">
            {votes.yes}
          </Text>
          <Icon as={AiOutlineCheck} color="info.success" />
        </Flex>
        <Flex alignItems={'center'}>
          <Text fontWeight="bold" mr="4px">
            {votes.no}
          </Text>
          <Icon as={AiOutlineClose} color="info.error" />
        </Flex>
      </Flex>
      <Flex ml="16px">
        <IconButton
          onClick={() => handleVote('yes')}
          bgColor={isPositiveVote ? 'info.success' : 'transparent'}
          _focus={{ boxShadow: 'none' }}
          height="fit-content"
          px="12px"
          py="6px"
          borderWidth="2px"
          borderRadius="0"
          borderColor="#000"
          aria-label="vote no"
          _hover={{ bgColor: 'info.success' }}
          icon={
            <Icon
              _hover={{ color: 'initial.white' }}
              as={AiOutlineCheck}
              color={isPositiveVote ? 'initial.white' : 'secondary.dark'}
            />
          }
        />
        <IconButton
          onClick={() => handleVote('no')}
          bgColor={isNegativeVote ? 'info.error' : 'transparent'}
          _focus={{ boxShadow: 'none' }}
          height="fit-content"
          px="12px"
          py="6px"
          borderWidth="2px"
          borderRadius="0"
          borderColor="#000"
          _hover={{ bgColor: 'info.error' }}
          aria-label="vote yes"
          icon={
            <Icon
              _hover={{ color: 'initial.white' }}
              as={AiOutlineClose}
              color={isNegativeVote ? 'initial.white' : 'secondary.dark'}
            />
          }
        />
      </Flex>
    </Flex>
  )
}

export default Votes
