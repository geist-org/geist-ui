import React from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof Props>
export type FieldsetSubtitleProps = Props & typeof defaultProps & NativeAttrs

const FieldsetSubtitle: React.FC<FieldsetSubtitleProps> = ({
  className,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <>
      <p className={className} {...props}>
        {children}
      </p>
      <style jsx>{`
        p {
          font-size: 0.875rem;
          line-height: 1.6;
          margin: ${theme.layout.gapHalf} 0;
        }
      `}</style>
    </>
  )
}

const MemoFieldsetSubtitle = React.memo(FieldsetSubtitle)

export default withDefaults(MemoFieldsetSubtitle, defaultProps)
