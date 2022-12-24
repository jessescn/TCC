import { Box, StyleProps } from '@chakra-ui/react'

type Props = StyleProps & {
  children: React.ReactNode
}

export const Container = ({ children, ...styleProps }: Props) => {
  return (
    <Box
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
      w="100%"
      h="100%"
      maxW="1200px"
      bgColor="initial.white"
      borderRadius="8px"
      p="2rem"
      {...styleProps}
    >
      {children}
    </Box>
  )
}
