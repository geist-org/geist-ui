import Badge from './badge'
import BadgeAnchor from './badge-anchor'

export type BadgeComponentType = typeof Badge & {
  Anchor: typeof BadgeAnchor
}
;(Badge as BadgeComponentType).Anchor = BadgeAnchor

export type { BadgeProps, BadgeTypes } from './badge'
export type { BadgeAnchorProps, BadgeAnchorPlacement } from './badge-anchor'
export default Badge as BadgeComponentType
