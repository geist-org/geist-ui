import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ModalTitleProps = Props & typeof defaultProps & NativeAttrs

const ModalTitle: React.FC<ModalTitleProps> = ({ className, children, ...props }) => {
  const theme = useTheme()

  return (
    <>
      <h2 className={className} {...props}>
        {children}
      </h2>
      <style jsx>{`
        h2 {
          font-size: 1.5rem;
          line-height: 1.6;
          font-weight: normal;
          text-align: center;
          margin: 0;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          word-break: break-word;
          text-transform: capitalize;
          color: ${theme.palette.foreground};
        }
      `}</style>
    </>
  )
}

const MemoModalTitle = React.memo(ModalTitle)

export default withDefaults(MemoModalTitle, defaultProps)
