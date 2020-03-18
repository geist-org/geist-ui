import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: ''
}

export type ModalContentProps = Props & typeof defaultProps & React.HTMLAttributes<HTMLElement>

const ModalContent: React.FC<ModalContentProps> = React.memo(({
  className, children, ...props
}) => {
  const theme = useTheme()
  
  return (
    <>
      <div className={`content ${className}`} {...props}>{children}</div>
      <style jsx>{`
        .content {
          margin: 0;
          padding: ${theme.layout.gap} 0 ${theme.layout.gapHalf} 0;
        }
        
        .content :global(p) {
          margin: 0;
        }
      `}</style>
    </>
  )
})

export default withDefaults(ModalContent, defaultProps)
