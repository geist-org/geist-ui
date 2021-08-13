import Card from './card'
import CardFooter from './card-footer'
import CardContent from './card-content'

export type CardComponentType = typeof Card & {
  Footer: typeof CardFooter
  Actions: typeof CardFooter
  Content: typeof CardContent
  Body: typeof CardContent
}
;(Card as CardComponentType).Footer = CardFooter
;(Card as CardComponentType).Actions = CardFooter
;(Card as CardComponentType).Content = CardContent
;(Card as CardComponentType).Body = CardContent

export type { CardProps } from './card'
export type { CardContentProps } from './card-content'
export type { CardFooterProps } from './card-footer'
export type { CardTypes } from '../utils/prop-types'
export default Card as CardComponentType
