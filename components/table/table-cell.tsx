import React from 'react'
import { TableDataItemBase, TableAbstractColumn, TableOnCellClick } from './table-types'

interface Props<TableDataItem extends TableDataItemBase> {
  columns: Array<TableAbstractColumn<TableDataItem>>
  row: TableDataItem
  rowIndex: number
  emptyText: string
  onCellClick?: TableOnCellClick<TableDataItem>
}

export type TableCellData<TableDataItem> = {
  row: number
  column: number
  rowValue: TableDataItem
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props<any>>
export type TableCellProps<TableDataItem extends TableDataItemBase> =
  Props<TableDataItem> & NativeAttrs

const TableCell = <TableDataItem extends TableDataItemBase>({
  columns,
  row,
  rowIndex,
  emptyText,
  onCellClick,
}: TableCellProps<TableDataItem>) => {
  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {columns.map((column, index) => {
        const currentRowValue = row[column.prop]
        const cellValue = currentRowValue || emptyText
        const shouldBeRenderElement = column.renderHandler(currentRowValue, row, rowIndex)

        return (
          <td
            key={`row-td-${index}-${column.prop}`}
            onClick={() => onCellClick && onCellClick(currentRowValue, rowIndex, index)}
            className={column.className}>
            <div className="cell">
              {shouldBeRenderElement ? shouldBeRenderElement : cellValue}
            </div>
          </td>
        )
      })}
    </>
  )
  /* eslint-enable */
}

export default TableCell
