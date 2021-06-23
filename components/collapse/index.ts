import Collapse from './collapse'
import CollapseGroup from './collapse-group'

export type CollapseComponentType = typeof Collapse & {
  Group: typeof CollapseGroup
}
;(Collapse as CollapseComponentType).Group = CollapseGroup

export default Collapse
