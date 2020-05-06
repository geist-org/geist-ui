import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof Props>
export type ModalSubtitleProps = Props & typeof defaultProps & NativeAttrs

const ModalSubtitle: React.FC<ModalSubtitleProps> = ({ className, children, ...props }) => {
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
          font-weight: normal;
          text-align: center;
          margin: 0;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          word-break: break-word;
          text-transform: uppercase;
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </>
  )
}

const MemoModalSubtitle = React.memo(ModalSubtitle)

export default withDefaults(MemoModalSubtitle, defaultProps)
