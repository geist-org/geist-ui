import Badge from './badge'
import BadgeAnchor from './badge-anchor'

export type BadgeComponentType = typeof Badge & {
  Anchor: typeof BadgeAnchor
}
;(Badge as BadgeComponentType).Anchor = BadgeAnchor

export default Badge as BadgeComponentType
