import Avatar from './avatar'
import AvatarGroup from './avatar-group'

export type AvatarComponentType = typeof Avatar & {
  Group: typeof AvatarGroup
}
;(Avatar as AvatarComponentType).Group = AvatarGroup

export default Avatar as AvatarComponentType
