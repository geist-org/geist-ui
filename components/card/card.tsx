import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { CardTypes } from '../utils/prop-types'
import { getStyles } from './styles'
import CardFooter from './card-footer'
import CardContent from './card-content'
import Image from '../image'
import { hasChild, pickChild } from '../utils/collections'
import useScaleable, { withScaleable } from '../use-scaleable'

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
export type CardProps = Props & NativeAttrs

const CardComponent: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  hoverable,
  className,
  shadow,
  type,
  ...props
}: CardProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
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
      {hasContent ? (
        withoutImageChildren
      ) : (
        <CardContent>{withoutImageChildren}</CardContent>
      )}
      {footerChildren}
      <style jsx>{`
        .card {
          background: ${theme.palette.background};
          transition: all 0.2s ease;
          border-radius: ${theme.layout.radius};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          box-sizing: border-box;
          color: ${color};
          background-color: ${bgColor};
          border: 1px solid ${borderColor};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .card:hover {
          box-shadow: ${hoverShadow};
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

CardComponent.defaultProps = defaultProps
CardComponent.displayName = 'GeistCard'
const Card = withScaleable(CardComponent)
export default Card
