import React from 'react'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'

export type PaginationNextProps = React.PropsWithChildren<React.ButtonHTMLAttributes<any>>

const PaginationNext: React.FC<PaginationNextProps> = ({ children, ...props }) => {
  const { updatePage, isLast } = usePaginationContext()
  return (
    <PaginationItem onClick={() => updatePage && updatePage('next')} disabled={isLast} {...props}>
      {children}
    </PaginationItem>
  )
}

export default PaginationNext
