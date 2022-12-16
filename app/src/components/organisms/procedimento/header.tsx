import {
  Box,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger as OrigPopoverTrigger,
  Portal,
  Text
} from '@chakra-ui/react'
import { NavigationBackButton } from 'components/molecules/nav-back-button'
import { Procedimento } from 'domain/entity/procedimento'
import {
  ProcedimentoModel,
  ProcedimentoStatus,
  statusList
} from 'domain/models/procedimento'
import { BiCommentDetail } from 'react-icons/bi'
import { formatDate } from 'utils/format'

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
              Revisor: {revisao.autor.nome || revisao.autor.email}
            </PopoverHeader>
            <PopoverBody>
              <Box>
                <Text fontSize="12px" fontWeight="bold">
                  Comentário:
                </Text>
                <Text fontSize="12px" mt="8px">
                  {revisao.comentario}
                </Text>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex>
        <NavigationBackButton />
        <Text fontSize="24px" fontWeight="bold">
          Procedimento{' '}
          <Text as="span" fontSize="20px" color="secondary.dark">
            ID: {procedimento.id}
          </Text>
        </Text>
      </Flex>
      <Flex>
        {revisaoPopover}
        <Box>
          {currentStatus && (
            <Text fontSize="20px" fontWeight="bold">
              Status:{' '}
              <Text
                as="span"
                textTransform="uppercase"
                color={currentStatus.color}
              >
                {currentStatus.label}
              </Text>
            </Text>
          )}
          {procedimento.updatedAt && (
            <Text fontSize="12px">
              Última atualização:{' '}
              <Text fontWeight="bold" as="span">
                {formatDate(procedimento.updatedAt)}
              </Text>
            </Text>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Header
