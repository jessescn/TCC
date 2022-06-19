import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { FormElement } from 'components/molecules/builder/form-element'
import Question from 'components/molecules/builder/question'
import { SlotDrop } from 'components/molecules/builder/slot-drop'
import { EditableText } from 'components/molecules/editable-text'
import { FormModel } from 'domain/models/form'
import { ReactNode, useState } from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

export const ItemTypes = {
  FIELD: 'field'
}

type DeletableProps = {
  children: ReactNode
  onRemove: (index: number) => void
  index: number
}

const Deletable = ({ children, onRemove, index }: DeletableProps) => {
  return (
    <Flex w="100%" alignItems="center">
      {children}{' '}
      <IconButton
        ml="16px"
        onClick={() => onRemove(index)}
        aria-label="remove slot"
        icon={<Icon as={AiOutlineClose} />}
      />
    </Flex>
  )
}

type FormBuilderProps = {
  form?: FormModel
}

export const FormBuilder = ({ form }: FormBuilderProps) => {
  const defaultSlots =
    form?.campos.map(campo => campo.type) || new Array(3).fill('slot')

  const [slots, setSlots] = useState<string[]>(defaultSlots)

  const handleUpdateSlots = (index: number, type = 'slot') => {
    setSlots(prev => {
      const newSlots = [...prev]

      newSlots.splice(index, 1, type)

      return newSlots
    })
  }

  const handleRemove = (index: number) => {
    setSlots(prev => {
      const newSlots = [...prev]

      newSlots.splice(index, 1)

      return newSlots
    })
  }

  const addSlot = () => {
    setSlots(prev => [...prev, 'slot'])
  }

  const getSlottableElementByType = (type: string, index: number) => {
    const elementsMap = new Map([
      ['slot', <SlotDrop index={index} onDrop={handleUpdateSlots} />],
      ['input', <Input placeholder="input field" w="100%" />],
      ['text', <EditableText w="100%" />]
    ])

    return elementsMap.get(type)
  }

  return (
    <Flex>
      <Box w="100%" pr={16}>
        <Text fontWeight="bold" color="primary.dark">
          Formulário
        </Text>
        <Question />
        {/* <Stack mt="16px">
          {slots.map((type, index) => {
            return (
              <Deletable index={index} onRemove={handleRemove}>
                {getSlottableElementByType(type, index)}
              </Deletable>
            )
          })}
        </Stack>
        <IconButton
          aria-label="adicionar slot"
          w="100%"
          onClick={addSlot}
          mt={4}
          icon={<Icon as={AiOutlinePlus} />}
        /> */}
      </Box>
    </Flex>
  )
}
