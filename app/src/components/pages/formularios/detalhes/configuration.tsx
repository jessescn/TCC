import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import { Button as CustomButton } from 'components/atoms/button'
import { ErrorMessage } from 'components/molecules/forms/error-message'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import { selectors, useSelector } from 'store'

type Props = {
  onDuplicate: () => void
}

export default function Configuration({ onDuplicate }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const [showContent, setShowContent] = useState(true)

  const formulario = useSelector(selectors.formularioDetalhes.getFormulario)

  return (
    <>
      <Box>
        <Flex justifyContent="space-between">
          <Button
            px={0}
            mb="0.5rem"
            display="block"
            variant="unstyled"
            onClick={() => setShowContent(prev => !prev)}
            _focus={{ boxShadow: 'none' }}
            leftIcon={
              <Icon
                as={showContent ? MdOutlineExpandLess : MdOutlineExpandMore}
              />
            }
          >
            Configurações Gerais
          </Button>
          <CustomButton size="sm" fontSize="sm" onClick={onDuplicate}>
            Duplicar formulário
          </CustomButton>
        </Flex>
        <Collapse in={showContent} animateOpacity>
          <Stack spacing="1rem">
            <Box alignItems="center">
              <Text fontSize="sm" mb="0.5rem" fontWeight="bold">
                Nome
              </Text>
              <Input
                size="sm"
                isInvalid={errors['nome']}
                defaultValue={formulario?.nome}
                {...register('nome', {
                  required: { value: true, message: 'Nome obrigatório' }
                })}
              />
              <ErrorMessage errors={errors} fieldName="nome" />
            </Box>
            <Box>
              <Text fontSize="sm" mb="0.5rem" fontWeight="bold">
                Descrição
              </Text>
              <Textarea
                size="sm"
                defaultValue={formulario?.descricao}
                {...register('descricao')}
              />
            </Box>
          </Stack>
        </Collapse>
      </Box>
    </>
  )
}
