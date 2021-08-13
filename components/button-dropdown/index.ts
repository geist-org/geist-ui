import ButtonDropdown from './button-dropdown'
import ButtonDropdownItem from './button-dropdown-item'

type ButtonDropdownType = typeof ButtonDropdown & {
  Item: typeof ButtonDropdownItem
}
;(ButtonDropdown as ButtonDropdownType).Item = ButtonDropdownItem

export type { ButtonDropdownProps, ButtonDropdownTypes } from './button-dropdown'
export type {
  ButtonDropdownItemProps,
  ButtonDropdownItemTypes,
} from './button-dropdown-item'
export default ButtonDropdown as ButtonDropdownType
