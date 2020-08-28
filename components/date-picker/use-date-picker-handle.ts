import { useRef } from 'react'
import { Dayjs } from 'dayjs'
import { PickerRefConfig } from '@jnoodle/rc-picker/lib/Picker'
import { RangeValue } from '@jnoodle/rc-picker/lib/interface'

export default () => {
  const ref = useRef<PickerRefConfig<Dayjs>>(null)
  return {
    focus: () => ref.current?.focus(),
    blur: () => ref.current?.blur(),
    setValue: (val: Dayjs | null | RangeValue<Dayjs>) => ref.current?.setValue(val),
    getValue: () => ref.current?.getValue(),
    ref,
  }
}
