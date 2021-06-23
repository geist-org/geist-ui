import User from './user'
import UserLink from './user-link'

export type UserComponentType = typeof User & {
  Link: typeof UserLink
}
;(User as UserComponentType).Link = UserLink

export default User as UserComponentType
