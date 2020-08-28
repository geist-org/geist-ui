import React, { useCallback, useMemo } from 'react'
import PaginationItem from './pagination-item'
import PaginationEllipsis from './pagination-ellipsis'
import { usePaginationContext } from './pagination-context'
interface Props {
  limit: number
  count: number
}

const PaginationPages: React.FC<Props> = ({ limit, count }) => {
  const { updatePage, page } = usePaginationContext()
  const showPages = useMemo(() => {
    const oddLimit = limit % 2 === 0 ? limit - 1 : limit
    return oddLimit - 2
  }, [limit])
  const middleNumber = (showPages + 1) / 2
  const [showBeforeEllipsis, showAfterEllipsis] = useMemo(() => {
    const showEllipsis = count > limit
    return [
      showEllipsis && page && page > middleNumber + 1,
      showEllipsis && page && page < count - middleNumber,
    ]
  }, [page, showPages, middleNumber, count, limit])
  const pagesArray = useMemo(() => [...new Array(showPages)], [showPages])

  const renderItem = useCallback(
    (value: number, active: number) => (
      <PaginationItem
        key={`pagination-item-${value}`}
        active={value === active}
        onClick={() => updatePage && updatePage('click', value)}>
        {value}
      </PaginationItem>
    ),
    [],
  )
  const startPages = pagesArray.map((_, index) => {
    const value = index + 2
    return renderItem(value, page as number)
  })
  const middlePages = pagesArray.map((_, index) => {
    const middleIndexNumber = middleNumber - (index + 1)
    const value = (page as number) - middleIndexNumber
    return (
      <PaginationItem
        key={`pagination-middle-${index}`}
        active={index + 1 === middleNumber}
        onClick={() => updatePage && updatePage('click', value)}>
        {value}
      </PaginationItem>
    )
  })
  const endPages = pagesArray.map((_, index) => {
    const value = count - (showPages - index)
    return renderItem(value, page as number)
  })
  if (count <= limit) {
    return (
      /* eslint-disable react/jsx-no-useless-fragment */
      <>
        {[...new Array(count)].map((_, index) => {
          const value = index + 1
          return (
            <PaginationItem
              key={`pagination-item-${value}`}
              active={value === page}
              onClick={() => updatePage && updatePage('click', value)}>
              {value}
            </PaginationItem>
          )
        })}
      </>
    )
    /* eslint-enable */
  }
  return (
    <>
      {renderItem(1, page as number)}
      {showBeforeEllipsis && (
        <PaginationEllipsis
          key="pagination-ellipsis-before"
          isBefore
          onClick={() =>
            updatePage && updatePage('click', (page as number) - 5 >= 1 ? (page as number) - 5 : 1)
          }
        />
      )}
      {showBeforeEllipsis && showAfterEllipsis
        ? middlePages
        : showBeforeEllipsis
        ? endPages
        : startPages}
      {showAfterEllipsis && (
        <PaginationEllipsis
          key="pagination-ellipsis-after"
          onClick={() =>
            updatePage &&
            updatePage('click', (page as number) + 5 <= count ? (page as number) + 5 : count)
          }
        />
      )}
      {renderItem(count, page as number)}
    </>
  )
}

export default PaginationPages
