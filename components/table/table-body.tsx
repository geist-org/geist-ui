import React from 'react'
import withDefaults from '../utils/with-defaults'
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
export type TableBodyProps = Props & typeof defaultProps & NativeAttrs

const TableBody: React.FC<TableBodyProps> = ({
  data,
  hover,
  emptyText,
  onRow,
  onCell,
}) => {
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
        }

        tr.hover:hover {
          background-color: ${theme.palette.accents_1};
        }

        tr :global(td) {
          padding: 0 ${theme.layout.gapHalf};
          border-bottom: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_6};
          font-size: 0.875rem;
          text-align: left;
        }

        tr :global(.cell) {
          min-height: 3.125rem;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          flex-flow: row wrap;
        }
      `}</style>
    </tbody>
  )
}

const MemoTableBody = React.memo(TableBody)

export default withDefaults(MemoTableBody, defaultProps)
