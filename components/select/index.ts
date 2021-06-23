import Select from './select'
import SelectOption from './select-option'

export type SelectComponentType = typeof Select & {
  Option: typeof SelectOption
}
;(Select as SelectComponentType).Option = SelectOption

export type { SelectProps, SelectTypes } from './select'
export type { SelectOptionProps } from './select-option'
export default Select as SelectComponentType
