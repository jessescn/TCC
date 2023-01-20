import { Box, Button, Collapse, Flex, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { IconType } from 'react-icons'

type Props = {
  icon: IconType
  children: JSX.Element
  title: string
}

export default function InfoCard({ icon, children, title }: Props) {
  const [show, setShow] = useState(false)

  const handleToggle = () => setShow(!show)

  return (
    <Box w="100%" shadow="md" rounded="md" alignItems="center" p={4}>
      <Button
        w="100%"
        variant="unstyled"
        color="primary.dark"
        fontWeight="bold"
        fontSize="lg"
        _focus={{ boxShadow: 'none' }}
        leftIcon={
          !show ? (
            <Icon boxSize={4} color="primary.dark" as={icon} />
          ) : undefined
        }
        textAlign="start"
        transition="0.2s ease all"
        pl={show ? '4rem' : '2.5rem'}
        onClick={handleToggle}
      >
        {title}
      </Button>
      <Collapse in={show} animateOpacity>
        <Flex justifyContent="center">
          <Icon mr="1rem" color="primary.dark" boxSize={12} as={icon} />
          {children}
        </Flex>
      </Collapse>
    </Box>
  )
}
