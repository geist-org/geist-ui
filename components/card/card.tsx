import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import { CardTypes } from '../utils/prop-types'
import { getStyles } from './styles'
import CardFooter from './card-footer'
import CardContent from './card-content'
import Image from '../image'
import { hasChild, pickChild } from '../utils/collections'

interface Props {
  hoverable?: boolean
  shadow?: boolean
  className?: string
  width?: string
  type?: CardTypes
}

const defaultProps = {
  type: 'default' as CardTypes,
  hoverable: false,
  shadow: false,
  width: '100%',
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CardProps = Props & typeof defaultProps & NativeAttrs

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children, hoverable, className, shadow, type, width, ...props
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
  
  const [withoutFooterChildren, footerChildren] = pickChild(children, CardFooter)
  const [withoutImageChildren, imageChildren] = pickChild(withoutFooterChildren, Image)
  const hasContent = hasChild(withoutImageChildren, CardContent)
  
  return (
    <div className={`card ${className}`} {...props}>
      {imageChildren}
      {hasContent ? withoutImageChildren : (
        <CardContent>{withoutImageChildren}</CardContent>
      )}
      {footerChildren}
      <style jsx>{`
        .card {
          background: ${theme.palette.background};
          margin: 0;
          padding: 0;
          width: ${width};
          transition: all .2s ease;
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
        
        .card :global(img) {
          width: 100%;
        }
        
        .card :global(.image) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      `}</style>
    </div>
  )
}

type MemoCardComponent<P = {}> = React.NamedExoticComponent<P> & {
  Footer: typeof CardFooter
  Actions: typeof CardFooter
  Content: typeof CardContent
  Body: typeof CardContent
}
type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps> & NativeAttrs

Card.defaultProps = defaultProps

export default React.memo(Card) as MemoCardComponent<ComponentProps>
