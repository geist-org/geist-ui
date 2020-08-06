import { Moment } from 'moment'
import momentGenerateConfig from '@jnoodle/rc-picker/lib/generate/moment'
import generatePicker, {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generate-picker'

export type DatePickerProps = PickerProps<Moment>
export type MonthPickerProps = Omit<PickerDateProps<Moment>, 'picker'>
export type WeekPickerProps = Omit<PickerDateProps<Moment>, 'picker'>
export type RangePickerProps = BaseRangePickerProps<Moment>

// TODO Fix range picker start week class name bug - @jnoodle/rc-picker
// TODO Mobile Compatibility:
//      It's acceptable now, but the experience is not excellent.
//      Think about `<input type="date/time" />`
// TODO `forwardRef` wrapped if necessary

export const DatePicker = generatePicker<Moment>(momentGenerateConfig)

export default DatePicker
