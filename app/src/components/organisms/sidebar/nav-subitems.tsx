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

import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

type Props = {
  icon: IconType
  title: string
  items: NavItemProps[]
}

export default function NavSubItems({ icon, title, items }: Props) {
  return (
    <Accordion allowMultiple allowToggle w="100%">
      <AccordionItem border="none" w="100%">
        {({ isExpanded }) => (
          <>
            <AccordionButton
              margin={0}
              padding={0}
              w="100%"
              _hover={{ bgColor: 'none' }}
              _pressed={{ outline: 'none' }}
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
                          <Icon as={icon} fontSize="xl" />
                          <Text ml={3} display={'flex'}>
                            {title}
                          </Text>
                        </Flex>
                        <Icon
                          as={isExpanded ? AiOutlineUp : AiOutlineDown}
                          fontSize="sm"
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
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  url={item.url}
                  style={{ marginTop: 0 }}
                />
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}