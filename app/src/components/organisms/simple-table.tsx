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
import Paginator from 'components/molecules/paginator'
import { ReactNode, useEffect, useState } from 'react'

export type Cell = {
  content: ReactNode
  props?: StyleProps
}

type Props = {
  columns: Cell[]
  rows: Cell[][]
  currentPage: number
  totalPages: number
  numberRows?: number
  onChangePage: (page: number) => void
}

const SimpleTable = ({
  columns,
  rows,
  currentPage,
  onChangePage,
  numberRows = 5,
  totalPages
}: Props) => {
  const [visibleRows, setVisibleRows] = useState<Cell[][]>([])

  useEffect(() => {
    const start = (currentPage - 1) * numberRows
    setVisibleRows(rows.slice(start, start + numberRows))
  }, [rows, currentPage])

  return (
    <>
      <Table>
        <Thead>
          <Tr bgColor="secondary.default">
            {columns.map((column, index) => (
              <Th
                color="initial.dark"
                textTransform="initial"
                fontSize="16px"
                key={`header-${index}`}
                {...column.props}
              >
                {column.content}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {visibleRows.map((row, rowIdx) => (
            <Tr
              _even={{
                bgColor: 'secondary.default'
              }}
              _hover={{ bgColor: 'secondary.light' }}
              key={`row-${rowIdx}`}
            >
              {row.map((cell, cellIdx) => (
                <Td
                  py="12px"
                  fontSize="14px"
                  key={`row-${rowIdx}-cell-${cellIdx}`}
                  {...cell.props}
                >
                  {cell.content}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {rows.length > numberRows && (
        <Flex mt="16px" justifyContent="flex-end">
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
