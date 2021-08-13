import React, { useEffect } from 'react'
import { useTableContext } from './table-context'
import useWarning from '../utils/use-warning'
import { TableColumnRender, TableDataItemBase } from './table-types'

const defaultProps = {
  className: '',
  render: () => {},
}

export type TableColumnProps<TableDataItem> = {
  prop: keyof TableDataItem
  label?: string
  width?: number
  className?: string
  render?: TableColumnRender<TableDataItem>
}

const TableColumn = <TableDataItem extends TableDataItemBase>(
  columnProps: React.PropsWithChildren<TableColumnProps<TableDataItem>>,
) => {
  const {
    children,
    prop,
    label,
    width,
    className,
    render: renderHandler,
  } = columnProps as React.PropsWithChildren<TableColumnProps<TableDataItem>> &
    typeof defaultProps
  const { updateColumn } = useTableContext<TableDataItem>()
  const safeProp = `${prop}`.trim()
  if (!safeProp) {
    useWarning('The props "prop" is required.', 'Table.Column')
  }

  useEffect(() => {
    updateColumn({
      label: children || label,
      prop: safeProp,
      width,
      className,
      renderHandler,
    })
  }, [children, label, prop, width, className, renderHandler])

  return null
}

TableColumn.defaultProps = defaultProps
TableColumn.displayName = 'GiestTableColumn'
export default TableColumn
