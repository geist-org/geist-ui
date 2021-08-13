import User from './user'
import UserLink from './user-link'

export type UserComponentType = typeof User & {
  Link: typeof UserLink
}
;(User as UserComponentType).Link = UserLink

export type { UserProps } from './user'
export default User as UserComponentType
