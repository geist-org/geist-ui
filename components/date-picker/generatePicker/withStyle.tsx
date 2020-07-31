import * as React from 'react'
import { generatePickerGlobalStyle } from '../style'
import useTheme from '../../styles/use-theme'
import { PickerProps, RangePickerProps } from './index'

// inject style to picker component
const withStyle = <DateType extends any>(Picker: React.FC) => (
  props: PickerProps<DateType> | RangePickerProps<DateType>,
) => {
  const theme = useTheme()
  return (
    <>
      <Picker {...props} />
      {generatePickerGlobalStyle(theme, props.prefixCls)}
    </>
  )
}

export default withStyle
