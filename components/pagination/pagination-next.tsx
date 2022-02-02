import React from 'react'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'

export type PaginationNextProps = React.ButtonHTMLAttributes<any>

const PaginationNext: React.FC<React.PropsWithChildren<PaginationNextProps>> = ({
  children,
  ...props
}) => {
  const { update, isLast } = usePaginationContext()
  return (
    <PaginationItem onClick={() => update && update('next')} disabled={isLast} {...props}>
      {children}
    </PaginationItem>
  )
}

PaginationNext.displayName = 'GeistPaginationNext'
export default PaginationNext
