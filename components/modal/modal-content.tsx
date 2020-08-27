import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props>
export type ModalContentProps = Props & NativeAttrs

const ModalContent: React.FC<ModalContentProps & typeof defaultProps> = ({
  className,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <>
      <div className={`content ${className}`} {...props}>
        {children}
      </div>
      <style jsx>{`
        .content {
          margin: 0 -${theme.layout.gap};
          padding: 0 calc(${theme.layout.gap} * 1.5) ${theme.layout.gapHalf};
          overflow-y: auto;
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

const MemoModalContent = React.memo(ModalContent)

export default withDefaults(MemoModalContent, defaultProps)
