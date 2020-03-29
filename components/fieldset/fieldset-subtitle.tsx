import React from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: ''
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof Props>
export type FieldsetSubtitleProps = Props & typeof defaultProps & NativeAttrs

const FieldsetSubtitle: React.FC<FieldsetSubtitleProps> = React.memo(({
  className, children, ...props
}) => {
  const theme = useTheme()

  return (
    <>
      <p className={className} {...props}>{children}</p>
      <style jsx>{`
        p {
          font-size: .875rem;
          line-height: 1.6;
          margin: ${theme.layout.gapHalf} 0;
        }
      `}</style>
    </>
  )
})

export default withDefaults(FieldsetSubtitle, defaultProps)
