import React, { ReactNode } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

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
export type DescriptionProps = Props & typeof defaultProps & NativeAttrs

const Description: React.FC<DescriptionProps> = ({ title, content, className, ...props }) => {
  const theme = useTheme()
  return (
    <dl className={className} {...props}>
      <dt>{title}</dt>
      <dd>{content}</dd>

      <style jsx>{`
        dl {
          margin: 0;
        }

        dt {
          height: 0.875rem;
          line-height: 0.875rem;
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          white-space: nowrap;
          color: ${theme.palette.accents_5};
          display: flex;
        }

        dd {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1rem;
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

const MemoDescription = React.memo(Description)

export default withDefaults(MemoDescription, defaultProps)
