import React, { useEffect, useMemo } from 'react'
import PaginationPrevious from './pagination-previous'
import PaginationNext from './pagination-next'
import PaginationPages from './pagination-pages'
import PaginationPageSize from './pagination-pageSize'
import PaginationQuickJumper from './pagination-quickjumper'
import { PaginationContext, PaginationConfig, PaginationUpdateType } from './pagination-context'
import useCurrentState from '../utils/use-current-state'
import { pickChild } from '../utils/collections'
import { NormalSizes, PaginationVariants } from '../utils/prop-types'
import { getSizes } from './styles'
interface Props {
  size?: NormalSizes
  page?: number
  initialPage?: number
  total?: number
  limit?: number
  defaultPageSize?: number
  pageSize: number
  variant?: PaginationVariants
  pageSizeOptions?: string[]
  onChange?: (val: number, pageSize: number) => void
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  initialPage: 1,
  total: 0,
  limit: 7,
  defaultPageSize: 10,
  variant: 'line' as PaginationVariants,
  pageSizeOptions: ['10', '20', '50', '100'],
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationProps = Props & typeof defaultProps & NativeAttrs

const getPageCount = (total: number, pageSize: number) => {
  return Math.floor((total - 1) / pageSize) + 1
}

const Pagination: React.FC<React.PropsWithChildren<PaginationProps>> = ({
  page: customPage,
  initialPage,
  total,
  limit,
  size,
  children,
  onChange,
  defaultPageSize,
  pageSize: customPageSize,
  variant,
  pageSizeOptions,
}) => {
  const [page, setPage, pageRef] = useCurrentState(initialPage)
  console.log(page)
  const [pageSize, setPageSize] = useCurrentState(defaultPageSize)
  const [, prevChildren] = pickChild(children, PaginationPrevious)
  const [, nextChildren] = pickChild(children, PaginationNext)
  const pageCount = useMemo(() => getPageCount(total, pageSize), [pageSize])
  const arrowRightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-arrow-right">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
  const arrowLeftIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-arrow-left">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  )

  const [prevItem, nextItem] = useMemo(() => {
    const hasChildren = (c: any) => React.Children.count(c) > 0
    const prevDefault = <PaginationPrevious>{arrowLeftIcon}</PaginationPrevious>
    const nextDefault = <PaginationNext>{arrowRightIcon}</PaginationNext>
    return [
      hasChildren(prevChildren) ? prevChildren : prevDefault,
      hasChildren(nextChildren) ? nextChildren : nextDefault,
    ]
  }, [prevChildren, nextChildren])
  const { font, width } = useMemo(() => getSizes(size), [size])

  const update = (type: PaginationUpdateType) => {
    if (type === 'prev' && pageRef.current > 1) {
      setPage(last => last - 1)
    }
    if (type === 'next' && pageRef.current < pageCount) {
      setPage(last => last + 1)
    }
  }
  const values = useMemo<PaginationConfig>(
    () => ({
      isFirst: page <= 1,
      isLast: page >= pageCount,
      update,
      variant,
    }),
    [page],
  )

  useEffect(() => {
    onChange && onChange(page, pageSize)
  }, [page, pageSize])
  useEffect(() => {
    if (customPage !== undefined) {
      setPage(customPage)
    }
  }, [customPage])
  useEffect(() => {
    if (customPageSize !== undefined) {
      setPageSize(customPageSize)
    }
  }, [customPageSize])

  return (
    <PaginationContext.Provider value={values}>
      <div className="pagination">
        <section>
          {prevItem}
          <PaginationPages count={pageCount} current={page} limit={limit} setPage={setPage} />
          {nextItem}
        </section>
        <PaginationQuickJumper onChange={setPage}></PaginationQuickJumper>
        <PaginationPageSize
          size={size}
          pageSizeOptions={pageSizeOptions}
          onChange={setPageSize}></PaginationPageSize>
      </div>

      <style jsx>{`
        .pagination {
          font-size: ${font};
        }
        section {
          margin: 0;
          padding: 0;
          font-variant: tabular-nums;
          font-feature-settings: 'tnum';
          --pagination-size: ${width};
        }

        section :global(button:last-of-type) {
          margin-right: 0;
        }
      `}</style>
    </PaginationContext.Provider>
  )
}

type MemoPaginationComponent<P = {}> = React.NamedExoticComponent<P> & {
  Previous: typeof PaginationPrevious
  Next: typeof PaginationNext
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Pagination.defaultProps = defaultProps

export default React.memo(Pagination) as MemoPaginationComponent<ComponentProps>
