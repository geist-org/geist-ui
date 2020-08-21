import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import { CardColors, CardVariants } from '../utils/prop-types'
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
  color?: CardColors
  variant?: CardVariants
}

const defaultProps = {
  color: 'default' as CardColors,
  hoverable: false,
  shadow: false,
  width: '100%',
  className: '',
  variant: 'solid' as CardVariants,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CardProps = Props & typeof defaultProps & NativeAttrs

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  hoverable,
  className,
  shadow,
  color: customColor,
  width,
  variant,
  ...props
}) => {
  const theme = useTheme()
  const boxShadow =
    shadow || (customColor === 'default' && variant === 'solid') ? theme.expressiveness.D4 : 'none'
  const hoverShadow = useMemo(() => {
    if (!hoverable) return boxShadow
    if (shadow || (customColor === 'default' && variant === 'solid')) return theme.expressiveness.D5
    return theme.expressiveness.D4
  }, [hoverable, shadow, theme.expressiveness, boxShadow])
  const { color, bgColor, borderColor, hoverBgColor, hoverBorderColor } = useMemo(
    () => getStyles(customColor, theme.palette, variant, hoverable),
    [customColor, theme.palette, shadow],
  )

  const [withoutFooterChildren, footerChildren] = pickChild(children, CardFooter)
  const [withoutImageChildren, imageChildren] = pickChild(withoutFooterChildren, Image)
  const hasContent = hasChild(withoutImageChildren, CardContent)

  return (
    <div className={`card ${className}`} {...props}>
      {imageChildren}
      {hasContent ? withoutImageChildren : <CardContent>{withoutImageChildren}</CardContent>}
      {footerChildren}
      <style jsx>{`
        .card {
          background: ${theme.palette.background};
          margin: 0;
          padding: 0;
          width: ${width};
          transition: all 0.2s ease;
          border-radius: ${theme.expressiveness.R2};
          box-shadow: ${boxShadow};
          box-sizing: border-box;
          color: ${color};
          background-color: ${bgColor};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1} ${borderColor};
        }

        .card:hover {
          box-shadow: ${hoverShadow};
          background-color: ${hoverBgColor};
          border: ${theme.expressiveness.L2} ${theme.expressiveness.cLineStyle1} ${hoverBorderColor};
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
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Card.defaultProps = defaultProps

export default React.memo(Card) as MemoCardComponent<ComponentProps>
