import * as React from 'react'
import { useImperativeHandle, useRef } from 'react'
import { generatePickerGlobalStyle } from '../style'
import useTheme from '../../styles/use-theme'
import { PickerProps, RangePickerProps } from './index'
import { SharedTimeProps } from '@jnoodle/rc-picker/lib/panels/TimePanel'
import { DisabledTime } from '@jnoodle/rc-picker/lib/interface'

// fix props ts error
export type CombineProps<DateType> = Omit<
  PickerProps<DateType> | RangePickerProps<DateType>,
  'showTime' | 'showToday' | 'showNow' | 'disabledTime'
> & {
  showToday?: boolean
  showNow?: boolean
  showTime?:
    | boolean
    | SharedTimeProps<DateType>
    | (Omit<SharedTimeProps<DateType>, 'defaultValue'> & {
        defaultValue?: DateType[]
      })
  disabledTime?: DisabledTime<DateType>
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
} & (
    | SharedTimeProps<DateType>
    | (Omit<SharedTimeProps<DateType>, 'defaultValue'> & {
        defaultValue?: DateType[]
      })
  )

// inject style to picker component
const withStyle = <DateType extends any>(Picker: React.FC<CombineProps<DateType>>) =>
  React.forwardRef((props: CombineProps<DateType>, ref: React.Ref<any>) => {
    const theme = useTheme()
    const pickerRef = useRef<any>(ref)

    // pick ref methods
    useImperativeHandle(ref, () => ({
      focus: pickerRef?.current?.focus,
      blur: pickerRef?.current?.blur,
      setValue: pickerRef?.current?.setValue,
      getValue: pickerRef?.current?.getValue,
    }))

    return (
      <>
        <Picker forwardedRef={pickerRef} {...props} />
        {generatePickerGlobalStyle<DateType>(theme, props)}
      </>
    )
  })

export default withStyle
