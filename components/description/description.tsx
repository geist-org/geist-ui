import React, { ReactNode } from 'react'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  title?: ReactNode | string
  content?: ReactNode | string
  className?: string
}

const defaultProps = {
  title: 'Title' as ReactNode | string,
  content: '' as ReactNode | string,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type DescriptionProps = Props & NativeAttrs

const DescriptionComponent: React.FC<DescriptionProps> = ({
  title,
  content,
  className,
  ...props
}: DescriptionProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  return (
    <dl className={`description ${className}`} {...props}>
      <dt>{title}</dt>
      <dd>{content}</dd>

      <style jsx>{`
        .description {
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        dt {
          font-size: 0.75em;
          line-height: 1em;
          margin-bottom: 0.5em;
          text-transform: uppercase;
          white-space: nowrap;
          color: ${theme.palette.accents_5};
          font-weight: 500;
          display: flex;
        }

        dd {
          font-size: 0.875em;
          margin: 0;
          line-height: 1.1em;
          color: ${theme.palette.foreground};
          font-weight: 500;
        }

        dd :global(p),
        dt :global(p) {
          margin: 0;
        }
      `}</style>
    </dl>
  )
}

DescriptionComponent.defaultProps = defaultProps
DescriptionComponent.displayName = 'GeistDescription'
const Description = withScaleable(DescriptionComponent)
export default Description
