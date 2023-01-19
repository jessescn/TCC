import { Icon, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { AiFillEdit } from 'react-icons/ai'
import { DataFetched } from 'store/ducks/analise-dados'
import EditGraphModal from '../modals/edit-graph'

type Props = {
  data: DataFetched
}

export default function EditGraph({ data }: Props) {
  const controls = useDisclosure()

  return (
    <>
      <Tooltip label="Editar Gráfico">
        <IconButton
          size="sm"
          onClick={controls.onOpen}
          _hover={{ bgColor: 'primary.default' }}
          bgColor="primary.dark"
          color="initial.white"
          aria-label="remove grafico"
          icon={<Icon as={AiFillEdit} />}
          mx="0.5rem"
        />
      </Tooltip>
      {controls.isOpen && (
        <EditGraphModal {...controls} position={data.position} current={data} />
      )}
    </>
  )
}
