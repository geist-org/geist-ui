import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FieldsetContentProps = Props & typeof defaultProps & NativeAttrs

const FieldsetContent: React.FC<React.PropsWithChildren<FieldsetContentProps>> = ({
  className,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <div className={`content ${className}`} {...props}>
      {children}
      <style jsx>{`
        .content {
          padding: ${theme.layout.gap};
        }

        .content :global(*:first-child) {
          margin-top: 0;
        }

        .content :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

export default withDefaults(FieldsetContent, defaultProps)
