import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { CardTypes } from '../utils/prop-types'
import { getStyles } from './styles'

interface Props {
  hoverable?: boolean
  shadow?: boolean
  className?: string
  type?: CardTypes
}

const defaultProps = {
  type: 'default' as CardTypes,
  hoverable: false,
  shadow: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CardProps = Props & typeof defaultProps & NativeAttrs

const Card: React.FC<React.PropsWithChildren<CardProps>> = React.memo(({
  children, hoverable, className, shadow, type, ...props
}) => {
  const theme = useTheme()
  const hoverShadow = useMemo(() => {
    if (shadow) return theme.expressiveness.shadowMedium
    return hoverable ? theme.expressiveness.shadowSmall : 'none'
  }, [hoverable, shadow, theme.expressiveness])
  const { color, bgColor, borderColor } = useMemo(
    () => getStyles(type, theme.palette, shadow),
    [type, theme.palette, shadow],
  )
  
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
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          box-sizing: border-box;
          color: ${color};
          background-color: ${bgColor};
          border: 1px solid ${borderColor};
        }
        
        .card:hover {
          box-shadow: ${hoverShadow};
        }
        
        .card :global(*:first-child) {
          margin-top: 0;
        }
        
        .card :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
})

export default withDefaults(Card, defaultProps)
