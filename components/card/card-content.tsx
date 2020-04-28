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
export type CardContentProps = Props & typeof defaultProps & NativeAttrs

const CardContent: React.FC<React.PropsWithChildren<CardContentProps>> = ({
  className, children, ...props
}) => {
  const theme = useTheme()
  
  return (
    <div className={`content ${className}`} {...props}>
      {children}
      <style jsx>{`
        .content {
          width: 100%;
          padding: ${theme.layout.gap} ${theme.layout.gap};
        }
      `}</style>
    </div>
  )
}

export default withDefaults(CardContent, defaultProps)
