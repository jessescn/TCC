import { Icon, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { AiOutlineFilter } from 'react-icons/ai'
import { DataFetched } from 'store/ducks/analise-dados'
import GraphFiltersModal from '../modals/filters'

type Props = {
  data: DataFetched
}

export default function FiltrosGraph(props: Props) {
  const controls = useDisclosure()

  return (
    <>
      <Tooltip label="Editar Filtros">
        <IconButton
          size="sm"
          onClick={controls.onOpen}
          _hover={{ bgColor: 'info.warning-light' }}
          bgColor="info.warning"
          color="initial.white"
          aria-label="remove grafico"
          icon={<Icon as={AiOutlineFilter} />}
        />
      </Tooltip>
      {controls.isOpen && <GraphFiltersModal {...controls} data={props.data} />}
    </>
  )
}
