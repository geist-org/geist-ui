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
export type RadioDescriptionProps = Props & typeof defaultProps & NativeAttrs

const RadioDescription: React.FC<React.PropsWithChildren<RadioDescriptionProps>> = ({
  className, children, ...props
}) => {
  const theme = useTheme()

  return (
    <span className={className} {...props}>
      {children}
      <style jsx>{`
        span {
          color: ${theme.palette.accents_3};
          font-size: .875rem;
        }
      `}</style>
    </span>
  )
}

const MemoRadioDescription = React.memo(RadioDescription)

export default withDefaults(MemoRadioDescription, defaultProps)
