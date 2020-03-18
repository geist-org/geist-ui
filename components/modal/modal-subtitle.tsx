import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: ''
}

export type ModalSubtitleProps = Props & typeof defaultProps & React.HTMLAttributes<HTMLHeadingElement>

const ModalSubtitle: React.FC<ModalSubtitleProps> = React.memo(({
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
})

export default withDefaults(ModalSubtitle, defaultProps)
