import React, { ReactNode, useMemo } from 'react'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  caption?: ReactNode | string
  shadow?: boolean
  className?: string
}

const defaultProps = {
  caption: '' as ReactNode | string,
  shadow: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type DisplayProps = Props & NativeAttrs

const DisplayComponent: React.FC<React.PropsWithChildren<DisplayProps>> = ({
  children,
  caption,
  shadow,
  className,
  ...props
}: React.PropsWithChildren<DisplayProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const showShadow = useMemo(() => shadow && theme.type !== 'dark', [theme.type, shadow])

  return (
    <div className={`display ${className}`} {...props}>
      <div className="content">{children}</div>
      <div className="caption">{caption}</div>

      <style jsx>{`
        .display {
          display: block;
          max-width: 100%;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(2.5)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(2.5)}
            ${SCALES.ml(0, 'auto')};
        }

        .content {
          display: block;
          margin: 0 auto;
          border-radius: 4px;
          overflow: hidden;
          width: ${SCALES.width(1, 'max-content')};
          box-shadow: ${showShadow ? theme.expressiveness.shadowLarge : 'none'};
          max-width: 100%;
        }

        .content :global(pre) {
          margin: 0;
          transition: min-width ease 0.2s;
        }

        .content :global(img) {
          display: block;
        }

        .caption {
          font-size: inherit;
          line-height: 1.5em;
          color: ${theme.palette.accents_5};
          margin: ${shadow ? '2.5em' : '1.3em'} auto 0;
          text-align: center;
          max-width: 85%;
        }
      `}</style>
    </div>
  )
}

DisplayComponent.defaultProps = defaultProps
DisplayComponent.displayName = 'GeistDisplay'
const Display = withScaleable(DisplayComponent)
export default Display
