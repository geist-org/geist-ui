import * as React from 'react'
import { useImperativeHandle, useRef } from 'react'
import { generatePickerGlobalStyle } from '../style'
import useTheme from '../../styles/use-theme'
import { PickerProps, RangePickerProps } from './index'

// inject style to picker component
const withStyle = <DateType extends any>(Picker: React.FC<any>) =>
  React.forwardRef(
    (props: PickerProps<DateType> | RangePickerProps<DateType>, ref: React.Ref<any>) => {
      const theme = useTheme()
      const pickerRef = useRef<any>(ref)

      // type valueType = DateType | [EventValue<DateType>, EventValue<DateType>] | null | undefined
      // const { defaultValue, ...rest } = props
      // const [key, setKey] = useState<number>(Math.random())
      // const [defaultVal, setDefaultVal] = useState<valueType>(defaultValue)

      // pick ref methods
      useImperativeHandle(ref, () => ({
        // setValue(value: valueType) {
        //   console.warn(
        //     "The `setValue` method will cause datePicker re-render, so should use this method with great caution. Don't use `focus` immediately.",
        //   )
        //   setDefaultVal(value)
        //   // defaultValue props change cannot cause re-render
        //   // changing key for force update
        //   setKey(Math.random())
        // },
        focus: pickerRef?.current?.focus,
        blur: pickerRef?.current?.blur,
        setValue: pickerRef?.current?.setValue,
        getValue: pickerRef?.current?.getValue,
      }))

      return (
        <>
          <Picker forwardedRef={pickerRef} {...props} />
          {generatePickerGlobalStyle(theme, props)}
        </>
      )
    },
  )

export default withStyle
