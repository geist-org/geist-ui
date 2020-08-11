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
  children,
  prop,
  label,
  width,
}) => {
  const { updateColumn } = useTableContext()
  if (!prop || prop.trim() === '') {
    useWarning('The props "prop" is required.', 'Table.Column')
  }

  useEffect(() => {
    updateColumn &&
      updateColumn({
        label: children || label,
        value: `${prop}`.trim(),
        width,
      })
  }, [children, label, prop, width])

  return null
}

export default TableColumn
