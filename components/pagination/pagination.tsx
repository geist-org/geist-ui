import React, { useEffect, useMemo } from 'react'
import PaginationPrevious from './pagination-previous'
import PaginationNext from './pagination-next'
import PaginationPages from './pagination-pages'
import {
  PaginationContext,
  PaginationConfig,
  PaginationUpdateType,
} from './pagination-context'
import useCurrentState from '../utils/use-current-state'
import { pickChild } from '../utils/collections'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  page?: number
  initialPage?: number
  count?: number
  limit?: number
  onChange?: (val: number) => void
}

const defaultProps = {
  initialPage: 1,
  count: 1,
  limit: 7,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationProps = Props & NativeAttrs

const PaginationComponent: React.FC<React.PropsWithChildren<PaginationProps>> = ({
  page: customPage,
  initialPage,
  count,
  limit,
  children,
  onChange,
}: React.PropsWithChildren<PaginationProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()
  const [page, setPage, pageRef] = useCurrentState(initialPage)
  const [, prevChildren] = pickChild(children, PaginationPrevious)
  const [, nextChildren] = pickChild(children, PaginationNext)

  const [prevItem, nextItem] = useMemo(() => {
    const hasChildren = (c: any) => React.Children.count(c) > 0
    const prevDefault = <PaginationPrevious>prev</PaginationPrevious>
    const nextDefault = <PaginationNext>next</PaginationNext>
    return [
      hasChildren(prevChildren) ? prevChildren : prevDefault,
      hasChildren(nextChildren) ? nextChildren : nextDefault,
    ]
  }, [prevChildren, nextChildren])

  const update = (type: PaginationUpdateType) => {
    if (type === 'prev' && pageRef.current > 1) {
      setPage(last => last - 1)
    }
    if (type === 'next' && pageRef.current < count) {
      setPage(last => last + 1)
    }
  }
  const values = useMemo<PaginationConfig>(
    () => ({
      isFirst: page <= 1,
      isLast: page >= count,
      update,
    }),
    [page],
  )

  useEffect(() => {
    onChange && onChange(page)
  }, [page])
  useEffect(() => {
    if (customPage !== undefined) {
      setPage(customPage)
    }
  }, [customPage])

  return (
    <PaginationContext.Provider value={values}>
      <nav>
        {prevItem}
        <PaginationPages count={count} current={page} limit={limit} setPage={setPage} />
        {nextItem}
      </nav>
      <style jsx>{`
        nav {
          font-variant: tabular-nums;
          font-feature-settings: 'tnum';
          --pagination-size: ${SCALES.font(2)};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        nav :global(button:last-of-type) {
          margin-right: 0;
        }
      `}</style>
    </PaginationContext.Provider>
  )
}

PaginationComponent.defaultProps = defaultProps
PaginationComponent.displayName = 'GeistPagination'
const Pagination = withScaleable(PaginationComponent)
export default Pagination
