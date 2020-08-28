import React from 'react'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'

export type PaginationNextProps = React.PropsWithChildren<React.ButtonHTMLAttributes<any>>

const PaginationPrevious: React.FC<PaginationNextProps> = ({ children, ...props }) => {
  const { updatePage, isFirst } = usePaginationContext()
  return (
    <PaginationItem onClick={() => updatePage && updatePage('prev')} disabled={isFirst} {...props}>
      {children}
    </PaginationItem>
  )
}

export default PaginationPrevious
