import Table from './table'
import TableColumn from './table-column'

export type TableComponentType = typeof Table & {
  Column: typeof TableColumn
}
;(Table as TableComponentType).Column = TableColumn

export default Table as TableComponentType
