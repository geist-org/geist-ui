import React from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PageHeaderProps = Props & typeof defaultProps & NativeAttrs

const PageFooter: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <footer {...props}>
      {children}
      <style jsx>{`
        footer {
          width: calc(100% - ${theme.layout.gap} * 2);
          position: absolute;
          bottom: 0;
        }
      `}</style>
    </footer>
  )
}

export default withDefaults(PageFooter, defaultProps)
