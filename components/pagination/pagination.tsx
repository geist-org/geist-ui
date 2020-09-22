import React, {
  useMemo,
  ReactNode,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useEffect,
} from 'react'
import {
  PaginationContext,
  PaginationConfig,
  PaginationUpdateType,
  PaginationHandles,
} from './pagination-context'
import useMergedState from '../utils/use-merged-state'
import { NormalSizes, PaginationVariants } from '../utils/prop-types'
import usePaginationHandle from './use-pagination-handle'
/**
 * styles
 */
import { getSizes } from './styles'
import ChevronLeft from '@zeit-ui/react-icons/chevronLeft'
import ChevronRight from '@zeit-ui/react-icons/chevronRight'
import useTheme from '../styles/use-theme'
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
  labelPageSizeBefore?: ReactNode | string
  labelPageSizeAfter?: ReactNode | string
  labelJumperBefore?: ReactNode | string
  labelJumperAfter?: ReactNode | string
  showQuickJumper?: boolean
  showPageSizeChanger?: boolean
  onPageChange?: (val: number, pageSize: number) => void
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
  labelPageSizeBefore: 'SHOW',
  labelPageSizeAfter: 'RECORDS',
  labelJumperBefore: 'GO TO',
  labelJumperAfter: 'PAGE',
  showQuickJumper: false,
  showPageSizeChanger: false,
}
type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationProps = React.PropsWithChildren<Props & NativeAttrs>
const Pagination = forwardRef<PaginationHandles, React.PropsWithChildren<PaginationProps>>(
  (
    {
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
      labelPageSizeBefore,
      labelPageSizeAfter,
      labelJumperBefore,
      labelJumperAfter,
      showQuickJumper,
      showPageSizeChanger,
      onPageSizeChange,
      onPageChange,
    }: PaginationProps & typeof defaultProps,
    ref: RefObject<PaginationHandles>,
  ) => {
    const theme = useTheme()
    const [page, setPage] = useMergedState(defaultPage, {
      value: customPage,
      onChange: (page): any => onPageChange && onPageChange(page, pageSize),
    })
    const [pageSize, setPageSize] = useMergedState(defaultPageSize, {
      value: customPageSize,
      onChange: (pageSize): any => onPageSizeChange && onPageSizeChange(page, pageSize),
    })
    const [, prevChildren] = pickChild(children, PaginationPrevious)
    const [, nextChildren] = pickChild(children, PaginationNext)
    const pageCount = useMemo(() => getPageCount(total, pageSize), [total, pageSize])
    const updatePage = (type: PaginationUpdateType, val: number) => {
      if (type === 'prev' && page > 1) {
        setPage(page - 1)
      }
      if (type === 'next' && page < pageCount) {
        setPage(page + 1)
      }
      if (type === 'click') {
        setPage(val)
      }
    }
    const updatePageSize = (val: number) => {
      setPageSize(val)
    }

    useImperativeHandle(ref, () => ({
      setPage: (value: number) => {
        setPage(value)
      },
      getPage: () => page,
      setPageSize: (value: number) => {
        setPageSize(value)
      },
      getPageSize: () => pageSize,
    }))

    const [prevItem, nextItem] = useMemo(() => {
      const hasChildren = (c: any) => React.Children.count(c) > 0
      const prevDefault = (
        <PaginationPrevious>
          <ChevronLeft color={theme.palette.cNeutral7}></ChevronLeft>
        </PaginationPrevious>
      )
      const nextDefault = (
        <PaginationNext>
          <ChevronRight color={theme.palette.cNeutral7}></ChevronRight>
        </PaginationNext>
      )
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
        updatePage,
        updatePageSize,
        variant,
        page,
        pageSize,
      }),
      [page, pageSize, updatePage, updatePageSize, variant],
    )

    useEffect(() => {
      onPageChange && onPageChange(page, pageSize)
    }, [page, pageSize])
    // useEffect(() => {
    //   if (customPage !== undefined) {
    //     setPage(customPage)
    //   }
    // }, [customPage])
    // useEffect(() => {
    //   if (customPageSize !== undefined) {
    //     setPageSize(customPageSize)
    //   }
    // }, [customPageSize])
    return (
      <PaginationContext.Provider value={values}>
        <div className="pagination">
          {showPageSizeChanger && (
            <div className="left">
              <PaginationPageSize
                size={size}
                pageSizeOptions={pageSizeOptions}
                pageSize={pageSize}
                onPageSizeChange={onPageSizeChange}
                total={total}
                labelPageSizeBefore={labelPageSizeBefore}
                labelPageSizeAfter={labelPageSizeAfter}></PaginationPageSize>
            </div>
          )}
          <div className="right">
            <section>
              {prevItem}
              <PaginationPages count={pageCount} limit={limit} />
              {nextItem}
            </section>
            {showQuickJumper && (
              <PaginationQuickJumper
                count={pageCount}
                size={size}
                labelJumperBefore={labelJumperBefore}
                labelJumperAfter={labelJumperAfter}></PaginationQuickJumper>
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
  },
)

Pagination.defaultProps = defaultProps

export default Pagination as typeof Pagination & {
  Previous: typeof PaginationPrevious
  Next: typeof PaginationNext
  usePaginationHandle: typeof usePaginationHandle
}
export { usePaginationHandle }
