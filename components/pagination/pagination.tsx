import React, { useEffect, useMemo } from 'react'
import { PaginationContext, PaginationConfig, PaginationUpdateType } from './pagination-context'
import useCurrentState from '../utils/use-current-state'
import { NormalSizes, PaginationVariants } from '../utils/prop-types'
/**
 * styles
 */
import { getSizes } from './styles'
/**
 * utils
 */
import { getPageCount } from './utils'
import { pickChild } from '../utils/collections'
/**
 * sub component
 */
import PaginationPrevious from './pagination-previous'
import PaginationNext from './pagination-next'
import PaginationPages from './pagination-pages'
import PaginationPageSize from './pagination-pageSize'
import PaginationQuickJumper from './pagination-quickjumper'
interface Props {
  total: number
  pageSize?: number
  page?: number
  defaultPage?: number
  variant?: PaginationVariants
  limit?: number
  size?: NormalSizes
  defaultPageSize?: number
  pageSizeOptions?: string[]
  showQuickJumper?: boolean
  showPageSizeChanger?: boolean
  onChange?: (val: number, pageSize: number) => void
  onPageSizeChange?: (current: number, pageSize: number) => void
}
const defaultProps = {
  total: 0,
  defaultPage: 1,
  variant: 'line' as PaginationVariants,
  limit: 7,
  size: 'medium' as NormalSizes,
  defaultPageSize: 10,
  pageSizeOptions: ['10', '20', '50', '100'],
  showQuickJumper: false,
  showPageSizeChanger: false,
}
type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationProps = Props & typeof defaultProps & NativeAttrs
const Pagination: React.FC<React.PropsWithChildren<PaginationProps>> = ({
  page: customPage,
  defaultPage,
  total,
  limit,
  size,
  children,
  defaultPageSize,
  pageSize: customPageSize,
  variant,
  pageSizeOptions,
  showQuickJumper,
  showPageSizeChanger,
  onPageSizeChange,
  onChange,
}) => {
  const [page, setPage, pageRef] = useCurrentState(defaultPage)
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-arrow-left">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  )
  const update = (type: PaginationUpdateType) => {
    if (type === 'prev' && pageRef.current > 1) {
      setPage(last => last - 1)
    }
    if (type === 'next' && pageRef.current < pageCount) {
      setPage(last => last + 1)
    }
  }
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
        {showPageSizeChanger && (
          <div className="left">
            <PaginationPageSize
              size={size}
              pageSizeOptions={pageSizeOptions}
              setPageSize={setPageSize}
              onPageSizeChange={onPageSizeChange}
              total={total}
              current={page}
              setPage={setPage}></PaginationPageSize>
          </div>
        )}
        <div className="right">
          <section>
            {prevItem}
            <PaginationPages count={pageCount} current={page} limit={limit} setPage={setPage} />
            {nextItem}
          </section>
          {showQuickJumper && (
            <PaginationQuickJumper
              onChange={setPage}
              count={pageCount}
              size={size}></PaginationQuickJumper>
          )}
        </div>
      </div>

      <style jsx>{`
        .pagination {
          font-size: ${font};
          display:flex;
          justify-content: space-between;
        }
        .pagination .left{
          display:${showPageSizeChanger}?'block':'none';
        }
        .pagination .right{
          display:flex;
          align-items:center;
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
