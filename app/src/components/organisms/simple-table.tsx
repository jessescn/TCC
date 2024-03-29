import {
  Flex,
  StyleProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Paginator } from 'components/molecules/paginator'
import { ReactNode } from 'react'

export type Cell = {
  content: ReactNode
  data?: any
  render?: (data: Cell) => ReactNode
  props?: StyleProps
}

type Props = {
  columns: Cell[]
  rows: Cell[][]
  currentPage: number
  totalPages: number
  numberRows?: number
  onChangePage: (page: number) => void
  onClickRow?: (row: Cell[]) => void
}

const SimpleTable = ({
  columns,
  rows,
  currentPage,
  onChangePage,
  onClickRow,
  totalPages
}: Props) => {
  return (
    <>
      <Table>
        <Thead>
          <Tr bgColor="primary.dark" color="initial.white">
            {columns.map((column, index) => (
              <Th
                color="initial.dark"
                textTransform="initial"
                fontSize="xs"
                key={`header-${index}`}
                {...column.props}
              >
                {column.render ? column.render(column) : column.content}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, rowIdx) => (
            <Tr
              cursor={onClickRow ? 'pointer' : 'inherit'}
              onClick={onClickRow ? () => onClickRow(row) : undefined}
              _hover={{
                bgColor: onClickRow ? 'secondary.semidark' : 'initial.white'
              }}
              _even={{
                bgColor: 'secondary.default',
                _hover: {
                  bgColor: onClickRow
                    ? 'secondary.semidark'
                    : 'secondary.default'
                }
              }}
              key={`row-${rowIdx}`}
            >
              {row.map((cell, cellIdx) => (
                <Td
                  py="0.75rem"
                  fontSize="xs"
                  key={`row-${rowIdx}-cell-${cellIdx}`}
                  {...cell.props}
                >
                  {cell.render ? cell.render(cell) : cell.content}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {totalPages > 1 && (
        <Flex mt="1rem" justifyContent="flex-end">
          <Paginator
            currentPage={currentPage}
            onChangePage={onChangePage}
            totalPages={totalPages}
          />
        </Flex>
      )}
    </>
  )
}

export default SimpleTable
