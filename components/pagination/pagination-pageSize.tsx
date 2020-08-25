import React, { Dispatch, SetStateAction, ReactNode } from 'react'
import Select from '../select'
import { NormalSizes } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
import { getPageCount } from './utils'
interface Props {
  pageSizeOptions: string[]
  size?: NormalSizes
  total?: number
  current: number
  labelPageSizeChangerBefore?: ReactNode | string
  labelPageSizeChangerAfter?: ReactNode | string
  onPageSizeChange?: (current: number, pageSize: number) => void
  setPageSize: Dispatch<SetStateAction<number>>
  setPage: Dispatch<SetStateAction<number>>
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  total: 0,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationPageSizeProps = Props & typeof defaultProps & NativeAttrs
const PaginationNext: React.FC<React.PropsWithChildren<PaginationPageSizeProps>> = ({
  pageSizeOptions,
  size,
  total,
  current,
  labelPageSizeChangerBefore,
  labelPageSizeChangerAfter,
  onPageSizeChange,
  setPageSize,
  setPage,
}) => {
  const theme = useTheme()
  const placeHolderVal = pageSizeOptions[0]
  const changeHandler = (val: string) => {
    const pageSize = Number(val)
    const newPageCount = getPageCount(total, pageSize)
    const newCurrent = current > newPageCount ? newPageCount : current
    setPage(newCurrent)
    setPageSize(pageSize)
    onPageSizeChange && onPageSizeChange(newCurrent, pageSize)
  }
  return (
    <div className="pagination-pagesize">
      <div className="text before">{labelPageSizeChangerBefore}</div>
      <Select
        variant="line"
        size={size}
        onChange={changeHandler}
        width="4.7143rem"
        placeholder={placeHolderVal}
        initialValue={placeHolderVal}>
        {pageSizeOptions?.map(pageSize => {
          return (
            <Select.Option value={pageSize} key={pageSize}>
              {pageSize}{' '}
            </Select.Option>
          )
        })}
      </Select>
      <div className="text after">{labelPageSizeChangerAfter}</div>
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
