import Popover from './popover'
import PopoverItem from './popover-item'

export type PopoverComponentType = typeof Popover & {
  Item: typeof PopoverItem
  Option: typeof PopoverItem
}
;(Popover as PopoverComponentType).Item = PopoverItem
;(Popover as PopoverComponentType).Option = PopoverItem

export type { PopoverProps, PopoverTriggerTypes, PopoverPlacement } from './popover'
export type { PopoverItemProps } from './popover-item'
export default Popover as PopoverComponentType
