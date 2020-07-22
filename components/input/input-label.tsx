import React from 'react'
import useTheme from '../styles/use-theme'

export interface InputLabel {
  isRight?: boolean
  fontSize: string
  solid?: boolean
}

const InputLabel: React.FC<React.PropsWithChildren<InputLabel>> = ({
  children,
  solid,
  isRight,
  fontSize,
}) => {
  const theme = useTheme()

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
          color: ${theme.palette.accents_4};
          background-color: ${theme.palette.accents_1};
          border-top-left-radius: ${theme.expressiveness.R2};
          border-bottom-left-radius: ${theme.expressiveness.R2};
          border-top: ${solid ? 'none' : '1px solid ' + theme.palette.border};
          border-left: ${solid ? 'none' : '1px solid ' + theme.palette.border};
          border-right: ${solid ? '1px solid ' + theme.palette.cWhite0 : 'none'};
          border-bottom: ${solid ? 'none' : '1px solid ' + theme.palette.border};
          font-size: ${fontSize};
        }

        span.right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: ${theme.expressiveness.R2};
          border-bottom-right-radius: ${theme.expressiveness.R2};
          border-left: ${solid ? '1px solid ' + theme.palette.cWhite0 : 'none'};
          border-right: ${solid ? 'none' : '1px solid ' + theme.palette.border};
        }
      `}</style>
    </span>
  )
}

const MemoInputLabel = React.memo(InputLabel)

export default MemoInputLabel
