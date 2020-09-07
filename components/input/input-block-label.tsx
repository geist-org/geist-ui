import React from 'react'
import useTheme from '../styles/use-theme'

type NativeAttrs = React.LabelHTMLAttributes<any>

const InputBlockLabel: React.FC<React.PropsWithChildren<NativeAttrs>> = ({
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <label {...props}>
      {children}
      <style jsx>{`
        label {
          display: block;
          font-weight: normal;
          color: ${theme.palette.cNeutral7};
          padding: 0 0 0 1px;
          margin-bottom: ${theme.layout.gapHalf};
          font-size: 1rem;
          line-height: 1.5;
        }

        label > :global(*:first-child) {
          margin-top: 0;
        }

        label > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </label>
  )
}

const MemoInputBlockLabel = React.memo(InputBlockLabel)

export default MemoInputBlockLabel
