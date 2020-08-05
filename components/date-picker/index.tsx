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

export const DatePicker = generatePicker<Moment>(momentGenerateConfig)

export default DatePicker
