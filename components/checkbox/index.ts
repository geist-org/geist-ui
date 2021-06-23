import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'

export type CheckboxComponentType = typeof Checkbox & {
  Group: typeof CheckboxGroup
}
;(Checkbox as CheckboxComponentType).Group = CheckboxGroup

export default Checkbox as CheckboxComponentType
