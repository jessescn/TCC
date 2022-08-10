import {
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger as OrigPopoverTrigger,
  Portal,
  Text
} from '@chakra-ui/react'
import { Procedimento } from 'domain/entity/procedimento'
import {
  ProcedimentoModel,
  ProcedimentoStatus,
  statusList
} from 'domain/models/procedimento'
import { BiCommentDetail } from 'react-icons/bi'

type Props = {
  procedimento: ProcedimentoModel
  status?: ProcedimentoStatus
}

export const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger

const Header = ({ procedimento, status }: Props) => {
  const currentStatus = status ? statusList[status] : undefined
  const revisao = Procedimento.getRevisao(procedimento)

  const revisaoPopover =
    !revisao || !status || status !== 'correcoes_pendentes' ? null : (
      <Popover>
        <PopoverTrigger>
          <IconButton
            size="sm"
            mr="8px"
            _focus={{ boxShadow: 'none' }}
            aria-label=""
            icon={<Icon as={BiCommentDetail} />}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent fontSize="14px" _focus={{ boxShadow: 'none' }}>
            <PopoverArrow />
            <PopoverHeader fontWeight="bold">
              Revisor: {revisao.autor}
            </PopoverHeader>
            <PopoverBody>{revisao.comentario}</PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="24px" fontWeight="bold">
        Procedimento{' '}
        <Text as="span" fontSize="20px" color="secondary.dark">
          #{procedimento.id}
        </Text>
      </Text>
      <Flex>
        {revisaoPopover}
        {currentStatus && (
          <Text fontSize="20px" fontWeight="bold">
            Status:{' '}
            <Text
              ml="8px"
              as="span"
              textTransform="uppercase"
              color={currentStatus.color}
            >
              {currentStatus.label}
            </Text>
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default Header
