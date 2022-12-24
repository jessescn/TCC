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

  const shouldHideRevisao = !revisao || status !== 'correcoes_pendentes'

  const revisaoPopover = shouldHideRevisao ? null : (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="sm"
          mr="0.5rem"
          aria-label=""
          icon={<Icon as={BiCommentDetail} />}
          _focus={{ boxShadow: 'none' }}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent fontSize="sm" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverHeader fontWeight="bold">
            Revisor: {revisao.autor.nome || revisao.autor.email}
          </PopoverHeader>
          <PopoverBody>
            <Box>
              <Text fontSize="sm" fontWeight="bold">
                Comentário:
              </Text>
              <Text fontSize="xs" mt="0.5rem">
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
        <Text fontSize="2xl" fontWeight="bold">
          Procedimento{' '}
          <Text as="span" fontSize="lg" color="secondary.dark">
            Id: {procedimento.id}
          </Text>
        </Text>
      </Flex>
      <Flex>
        {revisaoPopover}
        <Box>
          {currentStatus && (
            <Text fontSize="xl" fontWeight="bold">
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
            <Text fontSize="sm">
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
