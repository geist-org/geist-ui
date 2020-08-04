import React from 'react'
import useTheme from '../styles/use-theme'
import { InputVariantTypes } from '../utils/prop-types'
import withDefaults from '../utils/with-defaults'

export interface InputLabel {
  isRight?: boolean
  fontSize: string
  variant?: InputVariantTypes
}

const defaultProps = {
  variant: 'line' as InputVariantTypes,
}

type InputLabelProps = InputLabel & typeof defaultProps

const InputLabel: React.FC<React.PropsWithChildren<InputLabelProps>> = ({
  children,
  variant,
  isRight,
  fontSize,
}) => {
  const theme = useTheme()
  const isSolid = variant === 'solid'

  return (
    <span className={isRight ? 'right' : ''}>
      {children}
      <style jsx>{`
        span {
          display: inline-flex;
          width: initial;
          height: 100%;
          align-items: center;
          pointer-events: none;
          margin: 0;
          padding: 0 ${theme.layout.gapHalf};
          color: ${theme.palette.cNeutral5};
          background-color: ${theme.palette.cNeutral0};
          border-top-left-radius: ${theme.expressiveness.R2};
          border-bottom-left-radius: ${theme.expressiveness.R2};
          border-top: ${isSolid ? 'none' : '1px solid ' + theme.palette.border};
          border-left: ${isSolid ? 'none' : '1px solid ' + theme.palette.border};
          border-right: ${isSolid ? '1px solid ' + theme.palette.cNeutral8 : 'none'};
          border-bottom: ${isSolid ? 'none' : '1px solid ' + theme.palette.border};
          font-size: ${fontSize};
        }

        span.right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: ${theme.expressiveness.R2};
          border-bottom-right-radius: ${theme.expressiveness.R2};
          border-left: ${isSolid ? '1px solid ' + theme.palette.cNeutral8 : 'none'};
          border-right: ${isSolid ? 'none' : '1px solid ' + theme.palette.border};
        }
      `}</style>
    </span>
  )
}

const MemoInputLabel = withDefaults(React.memo(InputLabel), defaultProps)

export default MemoInputLabel
