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
import { NormalSizes } from '../utils/prop-types'

interface Props {
  size?: NormalSizes
  page?: number
  initialPage?: number
  count?: number
  limit?: number
  onChange?: (val: number) => void
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  initialPage: 1,
  count: 1,
  limit: 7,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationProps = Props & typeof defaultProps & NativeAttrs

type PaginationSize = {
  font: string
  width: string
}

const getPaginationSizes = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: PaginationSize } = {
    mini: {
      font: '.75rem',
      width: '1.25rem',
    },
    small: {
      font: '.75rem',
      width: '1.65rem',
    },
    medium: {
      font: '.875rem',
      width: '2rem',
    },
    large: {
      font: '1rem',
      width: '2.4rem',
    },
  }
  return sizes[size]
}

const Pagination: React.FC<React.PropsWithChildren<PaginationProps>> = ({
  page: customPage,
  initialPage,
  count,
  limit,
  size,
  children,
  onChange,
}) => {
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
  const { font, width } = useMemo(() => getPaginationSizes(size), [size])

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
          margin: 0;
          padding: 0;
          font-variant: tabular-nums;
          font-feature-settings: 'tnum';
          font-size: ${font};
          --pagination-size: ${width};
        }

        nav :global(button:last-of-type) {
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
