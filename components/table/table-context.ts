import React from 'react'

export type TableColumnItem = {
  value: string
  label: React.ReactNode | string
  width?: number
}

export interface TableConfig {
  columns: Array<TableColumnItem>
  updateColumn?: (column: TableColumnItem) => void
  removeRow?: (rowIndex: number) => void
  updateRow?: (rowIndex: number, newData: any) => void
}

const defaultContext = {
  columns: [],
}

export const TableContext = React.createContext<TableConfig>(defaultContext)

export const useTableContext = (): TableConfig =>
  React.useContext<TableConfig>(TableContext)
