/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, Flex, Link } from '@chakra-ui/react'
import Votes, { VoteOption } from 'components/molecules/votes'
import { useState } from 'react'

type Props = {
  isCommentsVisible: boolean
  onTogleComments: () => void
}

const Footer = ({ onTogleComments, isCommentsVisible }: Props) => {
  const [currentVote, setCurrentVote] = useState('' as VoteOption)

  const handleChangeVote = (vote: VoteOption) => {
    setCurrentVote(vote)
  }

  return (
    <Flex flexDir="column" align="center">
      <Flex w="100%" justifyContent="space-between">
        <Button
          bgColor="transparent"
          color="info.error"
          borderWidth="2px"
          fontSize="12px"
          borderColor="info.error"
          _hover={{
            color: 'initial.white',
            bgColor: 'info.error'
          }}
          px="20px"
          py="6px"
        >
          Alertar
        </Button>
        <Votes
          currentVote={currentVote}
          onVote={handleChangeVote}
          votes={{ no: 0, yes: 1 }}
        />
      </Flex>
      <Link
        onClick={onTogleComments}
        fontSize="12px"
        fontWeight="bold"
        textDecor="underline"
      >
        {!isCommentsVisible ? 'Mostrar comentários' : 'Ocultar'}
      </Link>
    </Flex>
  )
}

export default Footer
