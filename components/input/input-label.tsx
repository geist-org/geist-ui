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

type NativeAttrs = Omit<React.LabelHTMLAttributes<any>, keyof InputLabel>

type InputLabelProps = InputLabel & typeof defaultProps & NativeAttrs

const InputLabel: React.FC<React.PropsWithChildren<InputLabelProps>> = ({
  children,
  variant,
  isRight,
  fontSize,
  ...props
}) => {
  const theme = useTheme()
  const isSolid = variant === 'solid'

  return (
    <label className={isRight ? 'right' : ''} {...props}>
      {children}
      <style jsx>{`
        label {
          display: inline-flex;
          width: initial;
          height: 100%;
          align-items: center;
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

        label.right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: ${theme.expressiveness.R2};
          border-bottom-right-radius: ${theme.expressiveness.R2};
          border-left: ${isSolid ? '1px solid ' + theme.palette.cNeutral8 : 'none'};
          border-right: ${isSolid ? 'none' : '1px solid ' + theme.palette.border};
        }
      `}</style>
    </label>
  )
}

const MemoInputLabel = withDefaults(React.memo(InputLabel), defaultProps)

export default MemoInputLabel
