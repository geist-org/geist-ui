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
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          font-size: 0.875rem;
          padding: ${theme.layout.gapHalf};
          line-height: 1;
          background-color: ${theme.palette.background};
          color: ${theme.palette.accents_5};
          user-select: none;
          border: 0;
          border-radius: ${theme.layout.radius};
        }
      `}</style>
    </div>
  )
}

export default withDefaults(AutoCompleteSearch, defaultProps)
