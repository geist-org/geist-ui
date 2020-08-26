import { useRef } from 'react'
import { Dayjs } from 'dayjs'
import { PickerRefConfig } from '@jnoodle/rc-picker/es/Picker'

export default () => {
  const ref = useRef<PickerRefConfig<Dayjs>>(null)
  return {
    focus: ref.current?.focus,
    blur: ref.current?.blur,
    setValue: ref.current?.setValue,
    getValue: ref.current?.getValue,
    ref,
  }
}
