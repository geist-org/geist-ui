import React from 'react'

export type TableDataItemBase = Record<string, any>

export type TableColumnRender<Item extends TableDataItemBase> = (
  value: Item[keyof Item],
  rowData: Item,
  rowIndex: number,
) => JSX.Element | void

export type TableAbstractColumn<TableDataItem> = {
  prop: keyof TableDataItem
  label: React.ReactNode | string
  className: string
  width?: number
  renderHandler: TableColumnRender<TableDataItem>
}

export type TableOnRowClick<TableDataItem> = (
  rowData: TableDataItem,
  rowIndex: number,
) => void
export type TableOnCellClick<TableDataItem> = (
  cellValue: TableDataItem[keyof TableDataItem],
  rowIndex: number,
  colunmIndex: number,
) => void
export type TableOnChange<TableDataItem> = (data: Array<TableDataItem>) => void
export type TableRowClassNameHandler<TableDataItem> = (
  rowData: TableDataItem,
  rowIndex: number,
) => string
