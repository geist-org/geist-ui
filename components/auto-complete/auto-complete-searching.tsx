import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

export type AutoCompleteSearchProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const AutoCompleteSearch: React.FC<React.PropsWithChildren<AutoCompleteSearchProps>> = ({
  children,
  className,
}) => {
  const theme = useTheme()

  return (
    <div className={className}>
      {children}
      <style jsx>{`
        div {
          margin-top: calc(-${theme.layout.gapHalf} * 0.875);
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          font-size: 0.875rem;
          padding: 0 ${theme.layout.gapHalf};
          line-height: calc(2.4 * ${theme.layout.gap});
          color: ${theme.palette.cNeutral5};
          user-select: none;
          border: 0;
          border-radius: ${theme.expressiveness.R2};
        }
      `}</style>
    </div>
  )
}

export default withDefaults(AutoCompleteSearch, defaultProps)
