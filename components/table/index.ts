import Table from './table'
import TableColumn from './table-column'

export type TableComponentType = typeof Table & {
  Column: typeof TableColumn
}
;(Table as TableComponentType).Column = TableColumn

export type {
  TableProps,
  TableOnRow,
  TableOnChange,
  TableOnCell,
  TableDataSource,
} from './table'
export type { TableColumnProps } from './table-column'
export type {
  TableOperation,
  TableCellActions,
  TableCellActionRemove,
  TableCellActionUpdate,
  TableCellData,
} from './table-cell'
export default Table as TableComponentType
