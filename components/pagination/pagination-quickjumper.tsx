import React from 'react'
import Input from '../input'
import { NormalSizes } from '../utils/prop-types'
// import useTheme from '../styles/use-theme'

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size?: NormalSizes
}

const defaultProps = {
  size: 'medium' as NormalSizes,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PaginationQuickJumperProps = Props & typeof defaultProps & NativeAttrs
const PaginationNext: React.FC<React.PropsWithChildren<PaginationQuickJumperProps>> = ({
  onChange,
}) => {
  // const theme = useTheme()
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value && value.length > 0) {
      onChange(event.target.value)
    }
  }
  return (
    <div className="pagination-quickjumper">
      <span className="text left">GO TO</span>
      <Input onChange={changeHandler}></Input>
      <span className="text right">PAGES</span>
      <style jsx>
        {`
          .pagination-quickjumper {
            display: flex;
            align-items: center;
            font-size: inherit;
          }
        `}
      </style>
    </div>
  )
}

export default PaginationNext
