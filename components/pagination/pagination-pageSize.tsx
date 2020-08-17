import React from 'react'
import Select from '../select'
import { NormalSizes } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
interface Props {
  onChange?: (val: string) => void
  pageSizeOptions: string[]
  size?: NormalSizes
}

const defaultProps = {
  size: 'medium' as NormalSizes,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationPageSizeProps = Props & typeof defaultProps & NativeAttrs
const PaginationNext: React.FC<React.PropsWithChildren<PaginationPageSizeProps>> = ({
  pageSizeOptions,
  size,
  onChange,
}) => {
  const theme = useTheme()
  const placeHolderVal = pageSizeOptions[0]
  return (
    <div className="pagination-pagesize">
      <span className="text left">SHOW</span>
      <Select
        variant="line"
        size={size}
        onChange={onChange}
        width="66px"
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
      <span className="text right">RECORDS</span>
      <style jsx>
        {`
          .pagination-pagesize {
            display: flex;
            align-items: center;
            font-size: inherit;
          }
          .pagination-pagesize .text{
            color:${theme.palette.cNeutral6}
            font-weight:bold;
          }
          .pagination-pagesize .left{
            margin-right:8px;
          }
          .pagination-pagesize .right{
            margin-left:8px;
          }
        `}
      </style>
    </div>
  )
}

export default PaginationNext
