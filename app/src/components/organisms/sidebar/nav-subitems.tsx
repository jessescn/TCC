import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Text
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

import { Flex, Icon, Link, Menu, MenuButton } from '@chakra-ui/react'
import type { NavItemProps } from './nav-item'
import NavItem from './nav-item'

import { User } from 'domain/entity/user'
import { ProfileType } from 'domain/types/actors'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { selectors, useSelector } from 'store'

type Props = {
  icon: IconType
  title: string
  items: NavItemProps[]
  profiles?: ProfileType[]
  strict?: boolean
}

export default function NavSubItems({
  icon,
  title,
  items,
  profiles = [],
  strict
}: Props) {
  const currentUser = useSelector(selectors.session.getCurrentUser)

  const validation = User.includesInProfiles

  const havePermission =
    profiles.length > 0
      ? currentUser
        ? validation(currentUser, profiles)
        : false
      : true

  return !havePermission ? null : (
    <Accordion allowMultiple allowToggle w="100%">
      <AccordionItem border="none" w="100%">
        {({ isExpanded }) => (
          <>
            <AccordionButton
              margin={0}
              padding={0}
              w="100%"
              _hover={{ bgColor: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex mt={30} flexDir="column" w="100%" alignItems={'flex-start'}>
                <Menu placement="right">
                  <Link
                    p={3}
                    borderRadius={8}
                    _hover={{
                      textDecor: 'none'
                    }}
                    w={'100%'}
                  >
                    <MenuButton as="div" w="100%">
                      <Flex justifyContent="space-between" alignItems="center">
                        <Flex alignItems="center">
                          <Icon as={icon} fontSize="lg" />
                          <Text ml={3} display={'flex'} fontSize="14px">
                            {title}
                          </Text>
                        </Flex>
                        <Icon
                          as={isExpanded ? AiOutlineUp : AiOutlineDown}
                          fontSize="xs"
                        />
                      </Flex>
                    </MenuButton>
                  </Link>
                </Menu>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              {items.map(item => (
                <NavItem
                  isSubitem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  url={item.url}
                  style={{ marginTop: '8px' }}
                />
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
