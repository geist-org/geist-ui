import React, { useEffect, useMemo, useRef, useState } from 'react'
import TableHead from './table-head'
import TableBody from './table-body'
import useRealShape from '../utils/use-real-shape'
import useResize from '../utils/use-resize'
import { TableContext, TableColumnItem, TableConfig } from './table-context'
import useCurrentState from '../utils/use-current-state'
import { TableOperation } from './table-cell'
import useScaleable, { withScaleable } from '../use-scaleable'

export type TableOnRow = (row: any, index: number) => void
export type TableOnCell = (cell: any, index: number, colunm: number) => void
export type TableOnChange = (data: any) => void
export type TableDataSource<T extends { [key: string]: any }> = T & {
  operation?: TableOperation
}

interface Props {
  data?: Array<TableDataSource<any>>
  emptyText?: string
  hover?: boolean
  onRow?: TableOnRow
  onCell?: TableOnCell
  onChange?: TableOnChange
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
export type TableProps = Props & NativeAttrs

const TableComponent: React.FC<React.PropsWithChildren<TableProps>> = ({
  children,
  data,
  hover,
  emptyText,
  onRow,
  onCell,
  onChange,
  className,
  ...props
}: React.PropsWithChildren<TableProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()
  const ref = useRef<HTMLTableElement>(null)
  const [{ width }, updateShape] = useRealShape<HTMLTableElement>(ref)
  const [columns, setColumns] = useState<Array<TableColumnItem>>([])
  const [selfData, setSelfData, dataRef] = useCurrentState<Array<TableDataSource<any>>>(
    [],
  )
  const updateColumn = (column: TableColumnItem) => {
    setColumns(last => {
      const hasColumn = last.find(item => item.value === column.value)
      if (!hasColumn) return [...last, column]
      return last.map(item => {
        if (item.value !== column.value) return item
        return column
      })
    })
  }
  const removeRow = (rowIndex: number) => {
    const next = dataRef.current.filter((_, index) => index !== rowIndex)
    onChange(next)
    setSelfData([...next])
  }
  const updateRow = (rowIndex: number, newData: any) => {
    const next = dataRef.current.map((data, index) =>
      index === rowIndex ? { ...data, ...newData } : data,
    )
    onChange(next)
    setSelfData([...next])
  }

  const initialValue = useMemo<TableConfig>(
    () => ({
      columns,
      updateColumn,
      removeRow,
      updateRow,
    }),
    [columns],
  )

  useEffect(() => {
    if (!data) return
    setSelfData(data)
  }, [data])
  useResize(() => updateShape())

  return (
    <TableContext.Provider value={initialValue}>
      <table ref={ref} className={className} {...props}>
        <TableHead columns={columns} width={width} />
        <TableBody
          data={selfData}
          hover={hover}
          emptyText={emptyText}
          onRow={onRow}
          onCell={onCell}
        />
        {children}

        <style jsx>{`
          table {
            border-collapse: separate;
            border-spacing: 0;
            --table-fontsize: ${SCALES.font(1)};
            font-size: var(--table-fontsize);
            width: ${SCALES.width(1, '100%')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
        `}</style>
      </table>
    </TableContext.Provider>
  )
}

TableComponent.defaultProps = defaultProps
TableComponent.displayName = 'GeistTable'
const Table = withScaleable(TableComponent)
export default Table
