import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  hoverable?: boolean
  shadow?: boolean
  className?: string
}

const defaultProps = {
  hoverable: false,
  shadow: false,
  className: '',
}

export type CardProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const Card: React.FC<React.PropsWithChildren<CardProps>> = React.memo(({
  children, hoverable, className, shadow, ...props
}) => {
  const theme = useTheme()
  const hoverShadow = useMemo(() => {
    if (shadow) return theme.expressiveness.shadowMedium
    return hoverable ? theme.expressiveness.shadowSmall : 'none'
  }, [hoverable, shadow, theme.expressiveness])
  
  return (
    <div className={`card ${className}`} {...props}>
      {children}
      <style jsx>{`
        .card {
          background: ${theme.palette.background};
          margin: 0;
          width: 100%;
          transition: all .2s ease;
          padding: ${theme.layout.gap} ${theme.layout.gap};
          border-radius: ${theme.layout.radius};
          border: 1px solid ${shadow ? 'transparent' : theme.palette.border};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          box-sizing: border-box;
        }
        
        .card:hover {
          box-shadow: ${hoverShadow};
        }
        
        .card :global(p), .card :global(h1), .card :global(h2),
        .card :global(h3), .card :global(h4), .card :global(h5),
        .card :global(h6) {
          margin: 0;
        }
      `}</style>
    </div>
  )
})

export default withDefaults(Card, defaultProps)
