import React from 'react'
import { TableColumnItem, useTableContext } from './table-context'

interface Props {
  columns: Array<TableColumnItem>
  row: any
  rowIndex: number
  emptyText: string
  onCellClick: (cell: any, rowIndex: number, colunmIndex: number) => void
}

export type cellActions = {
  update: Function
  remove: Function
}

export type cellData = {
  row: number
  column: number
  rowValue: any
}

const TableCell: React.FC<Props> = ({ columns, row, rowIndex, emptyText, onCellClick }) => {
  const { removeRow, updateRow } = useTableContext()
  const actions: cellActions = {
    update: function <T>(data: T) {
      updateRow && updateRow(rowIndex, data)
    },
    remove: () => {
      removeRow && removeRow(rowIndex)
    },
  }
  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {columns.map((column, index) => {
        const data: cellData = {
          row: rowIndex,
          column: index,
          rowValue: row,
        }
        const rowLabel = row[column.value]
        const cellValue = !rowLabel
          ? emptyText
          : typeof rowLabel === 'function'
          ? rowLabel(actions, data)
          : rowLabel

        return (
          <td
            key={`row-td-${index}-${column.value}`}
            onClick={() => onCellClick(cellValue, rowIndex, index)}>
            <div className="cell">{cellValue}</div>
          </td>
        )
      })}
    </>
  )
  /* eslint-enable */
}

export default React.memo(TableCell)
