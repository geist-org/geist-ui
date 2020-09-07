import React, { useRef, ReactNode } from 'react'
import Input from '../input'
import { NormalSizes } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
import { usePaginationContext } from './pagination-context'

interface Props {
  count: number
  size?: NormalSizes
  labelJumperBefore?: ReactNode | string
  labelJumperAfter?: ReactNode | string
}

const defaultProps = {
  size: 'medium' as NormalSizes,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationQuickJumperProps = React.PropsWithChildren<Props & NativeAttrs>
const PaginationNext: React.FC<PaginationQuickJumperProps> = ({
  count,
  size,
  labelJumperBefore,
  labelJumperAfter,
}: PaginationQuickJumperProps & typeof defaultProps) => {
  const theme = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)
  const { variant, updatePage } = usePaginationContext()
  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement
    if (e.keyCode === 13) {
      let val = Number(target.value)
      if (Number.isInteger(val)) {
        if (val > count) {
          val = count
        }
        updatePage && updatePage('click', val)
      }
      inputRef.current && (inputRef.current.value = '')
    }
  }
  return (
    <div className="pagination-quickjumper">
      <div className="text before">{labelJumperBefore}</div>
      <Input
        onKeyDown={keyDownHandler}
        variant={variant}
        width="4.7143rem"
        size={size}
        ref={inputRef}></Input>
      <div className="text after">{labelJumperAfter}</div>
      <style jsx>
        {`
          .pagination-quickjumper {
            display: flex;
            align-items: center;
            font-size: inherit;
          }
          .pagination-quickjumper .text {
            font-size: inherit;
            color: ${theme.palette.cNeutral7};
            font-weight: 500;
          }
          .pagination-quickjumper .before {
            margin-right: ${theme.layout.gapHalf};
          }
          .pagination-quickjumper .after {
            margin-left: ${theme.layout.gapHalf};
          }
        `}
      </style>
    </div>
  )
}

export default PaginationNext
