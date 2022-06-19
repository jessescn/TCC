import { Box } from '@chakra-ui/react'
import { Draggable, Item } from './draggable'

type DraggableFormElementProps = {
  item: Item
  placeholder: string
}

export const FormElement = ({
  item,
  placeholder
}: DraggableFormElementProps) => {
  return (
    <Draggable item={item}>
      <Box
        p={4}
        color="initial.white"
        bgColor="primary.dark"
        borderRadius="4px"
        fontWeight="bold"
      >
        {placeholder}
      </Box>
    </Draggable>
  )
}
