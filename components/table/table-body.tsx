import React from 'react'
import useTheme from '../use-theme'
import TableCell from './table-cell'
import { useTableContext } from './table-context'

interface Props {
  hover: boolean
  emptyText: string
  onRow: (row: any, index: number) => void
  onCell: (cell: any, index: number, colunm: number) => void
  data: Array<any>
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TableBodyProps = Props & NativeAttrs

const TableBody: React.FC<TableBodyProps> = ({
  data,
  hover,
  emptyText,
  onRow,
  onCell,
}: TableBodyProps & typeof defaultProps) => {
  const theme = useTheme()
  const { columns } = useTableContext()
  const rowClickHandler = (row: any, index: number) => {
    onRow(row, index)
  }

  return (
    <tbody>
      {data.map((row, index) => {
        return (
          <tr
            key={`tbody-row-${index}`}
            className={hover ? 'hover' : ''}
            onClick={() => rowClickHandler(row, index)}>
            <TableCell
              columns={columns}
              row={row}
              rowIndex={index}
              emptyText={emptyText}
              onCellClick={onCell}
            />
          </tr>
        )
      })}
      <style jsx>{`
        tr {
          transition: background-color 0.25s ease;
          font-size: inherit;
        }

        tr.hover:hover {
          background-color: ${theme.palette.accents_1};
        }

        tr :global(td) {
          padding: 0 0.5em;
          border-bottom: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_6};
          font-size: calc(0.875 * var(--table-font-size));
          text-align: left;
        }

        tr :global(.cell) {
          min-height: calc(3.125 * var(--table-font-size));
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          flex-flow: row wrap;
        }
      `}</style>
    </tbody>
  )
}

TableBody.defaultProps = defaultProps
TableBody.displayName = 'GeistTableBody'
export default TableBody
