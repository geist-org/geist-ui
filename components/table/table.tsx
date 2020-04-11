import React, { useEffect, useMemo, useRef } from 'react'
import TableColumn from './table-column'
import TableHead from './table-head'
import TableBody from './table-body'
import useRealShape from '../utils/use-real-shape'
import useResize from '../utils/use-resize'
import { TableContext, TableColumnItem, TableConfig } from './table-context'
import useCurrentState from '../utils/use-current-state'

export type TableOnRow = (row: any, index: number) => void
export type TableOnCell = (cell: any, index: number, colunm: number) => void
export type TableOnChange = (data: any) => void

interface Props {
  data?: Array<any>
  emptyText?: string
  hover?: boolean
  onRow: TableOnRow
  onCell: TableOnCell
  onChange: TableOnChange
  className?: string
}

const defaultProps = {
  hover: true,
  emptyText: '',
  onRow: (() => {}) as TableOnRow,
  onCell: (() => {}) as TableOnCell,
  onChange: (() => {}) as TableOnChange,
  className: '',
}

type NativeAttrs = Omit<React.TableHTMLAttributes<any>, keyof Props>
export type TableProps = Props & typeof defaultProps & NativeAttrs

const Table: React.FC<React.PropsWithChildren<TableProps>> = ({
  children, data, hover, emptyText, onRow, onCell, onChange,
  className, ...props
}) => {
  const ref = useRef<HTMLTableElement>(null)
  const [{ width }, updateShape] = useRealShape<HTMLTableElement>(ref)
  const [columns, setColumns, columnsRef] = useCurrentState<Array<TableColumnItem>>([])
  const [selfData, setSelfData, dataRef] = useCurrentState<Array<TableColumnItem>>([])
  const appendColumn = (column: TableColumnItem) => {
    const pureCurrent = columnsRef.current.filter(item => item.value !== column.value)
    setColumns([...pureCurrent, column])
  }
  const removeRow = (rowIndex: number) => {
    const next = dataRef.current.filter((_, index) => index !== rowIndex)
    onChange(next)
    setSelfData([...next])
  }

  const initialValue = useMemo<TableConfig>(() => ({
    columns,
    appendColumn,
    removeRow,
  }), [columns])
  
  useEffect(() => {
    if (!data) return
    setSelfData(data)
  }, [data])
  useResize(() => updateShape())
  
  return (
    <TableContext.Provider value={initialValue}>
      <table ref={ref} className={className} {...props}>
        <TableHead columns={columns} width={width} />
        <TableBody data={selfData} hover={hover} emptyText={emptyText}
          onRow={onRow} onCell={onCell} />
        {children}
  
        <style jsx>{`
          table {
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
          }
        `}</style>
      </table>
    </TableContext.Provider>
  )
}

type TableComponent<P = {}> = React.FC<P> & {
  Column: typeof TableColumn
}
type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps> & NativeAttrs

(Table as TableComponent<ComponentProps>).defaultProps = defaultProps

export default Table as TableComponent<ComponentProps>
