import React from 'react'
import useTheme from '../styles/use-theme'

export interface InputLabel {
  isRight?: boolean
  fontSize: string
}

const InputLabel: React.FC<React.PropsWithChildren<InputLabel>> = React.memo(({
  children, isRight, fontSize,
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
          border-top-left-radius: ${theme.layout.radius};
          border-bottom-left-radius: ${theme.layout.radius};
          border-top: 1px solid ${theme.palette.border};
          border-left: 1px solid ${theme.palette.border};
          border-bottom: 1px solid ${theme.palette.border};
          font-size: ${fontSize};
          line-height: 1;
        }
        
        span.right {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-top-right-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          border-left: 0;
          border-right: 1px solid ${theme.palette.border};
        }
      `}</style>
    </span>
  )
})

export default InputLabel
