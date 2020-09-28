import React, { ReactNode } from 'react'
import Select from '../select'
import { NormalSizes } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
import { getPageCount } from './utils'
import { usePaginationContext } from './pagination-context'
interface Props {
  pageSizeOptions: string[]
  pageSize: number
  size?: NormalSizes
  total?: number
  labelPageSizeBefore?: ReactNode | string
  labelPageSizeAfter?: ReactNode | string
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  total: 0,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationPageSizeProps = React.PropsWithChildren<Props & NativeAttrs>
const PaginationNext: React.FC<PaginationPageSizeProps> = ({
  pageSizeOptions,
  pageSize,
  size,
  total,
  labelPageSizeBefore,
  labelPageSizeAfter,
}: PaginationPageSizeProps & typeof defaultProps) => {
  const theme = useTheme()
  const { updatePage, updatePageSize, page, simple } = usePaginationContext()
  const changeHandler = (val: string) => {
    const pageSize = Number(val)
    const newPageCount = getPageCount(total, pageSize)
    const newCurrent = page && page > newPageCount ? newPageCount : page
    updatePageSize && updatePageSize(pageSize)
    updatePage && updatePage('click', newCurrent)
  }

  const getPageSizeOptions = () => {
    if (pageSizeOptions.some(option => option.toString() === pageSize.toString())) {
      return pageSizeOptions
    }
    return pageSizeOptions.concat([pageSize.toString()]).sort((a, b) => {
      const numberA = isNaN(Number(a)) ? 0 : Number(a)
      const numberB = isNaN(Number(b)) ? 0 : Number(b)
      return numberA - numberB
    })
  }
  const mergedOptions = getPageSizeOptions()

  return (
    <div className="pagination-pagesize">
      {!simple && <div className="text before">{labelPageSizeBefore}</div>}
      <Select
        variant="line"
        size={size}
        disableMatchWidth
        onChange={changeHandler}
        defaultValue={pageSize.toString()}>
        {mergedOptions?.map(pageSize => {
          return (
            <Select.Option value={pageSize} key={pageSize}>
              {pageSize}{' '}
            </Select.Option>
          )
        })}
      </Select>
      {!simple && <div className="text after">{labelPageSizeAfter}</div>}
      <style jsx>
        {`
          .pagination-pagesize {
            display: flex;
            align-items: center;
            font-size: inherit;
          }
          .pagination-pagesize .text {
            color: ${theme.palette.cNeutral6};
            font-weight: 500;
          }
          .pagination-pagesize .before {
            margin-right: ${theme.layout.gapHalf};
          }
          .pagination-pagesize .after {
            margin-left: ${theme.layout.gapHalf};
          }
        `}
      </style>
    </div>
  )
}

export default PaginationNext
