import React from 'react'
import { TableAbstractColumn } from './table-types'

export interface TableConfig<T> {
  columns: Array<TableAbstractColumn<T>>
  updateColumn: (column: TableAbstractColumn<T>) => void
}

const defaultContext = {
  columns: [],
  updateColumn: () => {},
}

export const TableContext = React.createContext<TableConfig<any>>(defaultContext)

export const useTableContext = <T>(): TableConfig<T> =>
  React.useContext<TableConfig<T>>(TableContext)
