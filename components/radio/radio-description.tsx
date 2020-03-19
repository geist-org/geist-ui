import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

export type RadioDescriptionProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const RadioDescription: React.FC<React.PropsWithChildren<RadioDescriptionProps>> = React.memo(({
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
})

export default withDefaults(RadioDescription, defaultProps)
