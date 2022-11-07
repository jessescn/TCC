import { Text } from '@chakra-ui/react'

type Props = {
  fieldName: string
  errors: {
    [x: string]: any
  }
}

export const ErrorMessage = ({ errors, fieldName }: Props) => {
  console.log(errors)

  return !errors[fieldName] ? null : (
    <Text mt="6px" fontSize="10px" color="#E53E3E">
      {errors[fieldName]?.message}
    </Text>
  )
}
