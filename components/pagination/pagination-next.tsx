import React from 'react'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'
import { withPureProps } from '../use-scaleable'

export type PaginationNextProps = React.ButtonHTMLAttributes<any>

const PaginationNext: React.FC<React.PropsWithChildren<PaginationNextProps>> = ({
  children,
  ...props
}) => {
  const { update, isLast } = usePaginationContext()
  return (
    <PaginationItem
      onClick={() => update && update('next')}
      disabled={isLast}
      {...withPureProps(props)}>
      {children}
    </PaginationItem>
  )
}

PaginationNext.displayName = 'GeistPaginationNext'
export default PaginationNext
