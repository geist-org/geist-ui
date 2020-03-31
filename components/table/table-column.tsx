import React, { useEffect } from 'react'
import { useTableContext } from './table-context'
import useWarning from '../utils/use-warning'

interface Props {
  prop: string
  label?: string
  width?: number
}

export type TableColumnProps = Props

const TableColumn: React.FC<React.PropsWithChildren<TableColumnProps>> = ({
  children, prop, label, width,
}) => {
  const { appendColumn } = useTableContext()
  if (!prop || prop.trim() === '') {
    useWarning('The props "prop" is required.', 'Table.Column')
  }
  
  useEffect(() => {
    appendColumn && appendColumn({
      label: children || label,
      value: `${prop}`.trim(),
      width,
    })
  }, [])

  return null
}

export default TableColumn
