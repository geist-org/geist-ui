import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof Props>
export type ModalSubtitleProps = Props & typeof defaultProps & NativeAttrs

const ModalSubtitle: React.FC<ModalSubtitleProps> = ({
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
          font-weight: normal;
          display: inline-block;
          line-height: 1.5rem;
          height: 1.5rem;
          text-align: center;
          margin: 0;
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
