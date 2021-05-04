import ButtonDropdown from './button-dropdown'
import ButtonDropdownItem from './button-dropdown-item'

type ButtonDropdownType = typeof ButtonDropdown & {
  Item: typeof ButtonDropdownItem
}
;(ButtonDropdown as ButtonDropdownType).Item = ButtonDropdownItem

export default ButtonDropdown as ButtonDropdownType
