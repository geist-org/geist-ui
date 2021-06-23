import Radio from './radio'
import RadioGroup from './radio-group'
import RadioDescription from './radio-description'

export type RadioComponentType = typeof Radio & {
  Group: typeof RadioGroup
  Description: typeof RadioDescription
  Desc: typeof RadioDescription
}
;(Radio as RadioComponentType).Group = RadioGroup
;(Radio as RadioComponentType).Description = RadioDescription
;(Radio as RadioComponentType).Desc = RadioDescription

export default Radio as RadioComponentType
