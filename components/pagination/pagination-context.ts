import React from 'react'
import { tuple, PaginationVariants } from '../utils/prop-types'
const paginationUpdateTypes = tuple('prev', 'next', 'click')

export type PaginationUpdateType = typeof paginationUpdateTypes[number]

export interface PaginationConfig {
  isFirst?: boolean
  isLast?: boolean
  updatePage?: (type: PaginationUpdateType, val?: number) => void
  updatePageSize?: Function
  variant?: PaginationVariants
  page?: number
  pageSize?: number
}

export interface PaginationHandles {
  setPage: (value: number) => void
  getPage: () => number
  setPageSize: (value: number) => void
  getPageSize: () => number
}

const defaultContext = {
  variant: 'line' as PaginationVariants,
}

export const PaginationContext = React.createContext<PaginationConfig>(defaultContext)

export const usePaginationContext = (): PaginationConfig =>
  React.useContext<PaginationConfig>(PaginationContext)
