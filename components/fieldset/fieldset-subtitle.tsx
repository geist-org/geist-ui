import React from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>
export type FieldsetSubtitleProps = Props & typeof defaultProps & NativeAttrs

const FieldsetSubtitle: React.FC<FieldsetSubtitleProps> = ({
  className,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <>
      <div className={className} {...props}>
        {children}
      </div>
      <style jsx>{`
        div {
          font-size: 0.875rem;
          line-height: 1.6;
          letter-spacing: -0.005625rem;
          margin: ${theme.layout.gapHalf} 0;
        }
      `}</style>
    </>
  )
}

const MemoFieldsetSubtitle = React.memo(FieldsetSubtitle)

export default withDefaults(MemoFieldsetSubtitle, defaultProps)
