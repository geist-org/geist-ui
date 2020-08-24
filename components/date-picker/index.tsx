import { Dayjs } from 'dayjs'
import generateConfig from '@jnoodle/rc-picker/lib/generate/dayjs'
import generatePicker, {
  PickerProps,
  PickerDateProps,
  RangePickerProps as BaseRangePickerProps,
} from './generate-picker'

export type DatePickerProps = PickerProps<Dayjs>
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>
export type RangePickerProps = BaseRangePickerProps<Dayjs>

// TODO Fix range picker start week class name bug - @jnoodle/rc-picker
// TODO Mobile Compatibility:
//      It's acceptable now, but the experience is not excellent.
//      Think about `<input type="date/time" />`

export const DatePicker = generatePicker<Dayjs>(generateConfig)

export default DatePicker
