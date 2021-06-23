import React from 'react'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

export type AutoCompleteSearchProps = Props & React.HTMLAttributes<any>

const AutoCompleteSearchComponent: React.FC<
  React.PropsWithChildren<AutoCompleteSearchProps>
> = ({
  children,
  className,
}: React.PropsWithChildren<AutoCompleteSearchProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()

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
          padding: ${theme.layout.gapHalf};
          line-height: 1;
          background-color: ${theme.palette.background};
          color: ${theme.palette.accents_5};
          user-select: none;
          border: 0;
          border-radius: ${theme.layout.radius};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.875)} ${SCALES.pr(0.875)} ${SCALES.pb(0.875)}
            ${SCALES.pl(0.875)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </div>
  )
}

AutoCompleteSearchComponent.defaultProps = defaultProps
AutoCompleteSearchComponent.displayName = 'GeistAutoCompleteSearch'
const AutoCompleteSearch = withScaleable(AutoCompleteSearchComponent)

export default AutoCompleteSearch
