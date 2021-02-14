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
export type PageContentProps = Props & typeof defaultProps & NativeAttrs

const PageContent: React.FC<React.PropsWithChildren<PageContentProps>> = ({
  className,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <main className={className} {...props}>
      {children}
      <style jsx>{`
        main {
          width: 100%;
          padding: calc(${theme.layout.gap} * 2.5) 0;
        }
      `}</style>
    </main>
  )
}

export default withDefaults(PageContent, defaultProps)
