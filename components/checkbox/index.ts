import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'

export type CheckboxComponentType = typeof Checkbox & {
  Group: typeof CheckboxGroup
}
;(Checkbox as CheckboxComponentType).Group = CheckboxGroup

export type {
  CheckboxProps,
  CheckboxEvent,
  CheckboxEventTarget,
  CheckboxTypes,
} from './checkbox'
export type { CheckboxGroupProps } from './checkbox-group'
export default Checkbox as CheckboxComponentType
