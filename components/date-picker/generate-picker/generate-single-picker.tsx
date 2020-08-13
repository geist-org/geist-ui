import * as React from 'react'
import { useMemo } from 'react'
import { Calendar, Clock } from '@zeit-ui/react-icons'
import RCPicker from '@jnoodle/rc-picker'
import { PickerMode } from '@jnoodle/rc-picker/lib/interface'
import { GenerateConfig } from '@jnoodle/rc-picker/lib/generate'
import { getLocale, getPlaceholder } from '../util'
import { Components, getTimeProps, PickerDateProps, PickerProps, PickerTimeProps } from '.'
import InputClearIcon from '../../input/input-icon-clear'
import InputIcon from '../../input/input-icon'
import { getSizes } from '../../input/styles'
import withStyle from './with-style'

export default function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps = PickerProps<DateType>

  function getPicker<InnerPickerProps extends DatePickerProps>(picker?: PickerMode) {
    const Picker: React.FC<InnerPickerProps> = props => {
      const {
        forwardedRef,
        prefixCls: customizePrefixCls,
        getPopupContainer: customizeGetPopupContainer,
        className = '',
        locale = 'en-US',
        size: customizeSize = 'medium',
        variant: customizeVariant = 'line',
        color: customizeColor = 'default',
        bordered = true,
        placeholder,
        ...restProps
      } = props
      const { format, showTime } = props as any
      const prefixCls = `${customizePrefixCls || 'cfx'}-picker`
      const { heightRatio: inputHeightRatio } = useMemo(() => getSizes(customizeSize), [
        customizeSize,
      ])

      const additionalProps = {
        showToday: true,
      }

      let additionalOverrideProps: any = {}
      if (picker) {
        additionalOverrideProps.picker = picker
      }
      const mergedPicker = picker || props.picker

      additionalOverrideProps = {
        ...additionalOverrideProps,
        ...(showTime ? getTimeProps({ format, picker: mergedPicker, ...showTime }) : {}),
        ...(mergedPicker === 'time'
          ? getTimeProps({ format, ...props, picker: mergedPicker })
          : {}),
      }

      return (
        <RCPicker<DateType>
          ref={forwardedRef}
          placeholder={getPlaceholder(mergedPicker, locale, placeholder)}
          suffixIcon={
            mergedPicker === 'time' ? (
              <InputIcon icon={<Clock />} ratio={inputHeightRatio} clickable={false} />
            ) : (
              <InputIcon icon={<Calendar />} ratio={inputHeightRatio} clickable={false} />
            )
          }
          clearIcon={
            <InputIcon
              icon={<InputClearIcon visible heightRatio={inputHeightRatio} />}
              ratio={inputHeightRatio}
              clickable={false}
            />
          }
          allowClear
          transitionName="slide-up"
          {...additionalProps}
          {...restProps}
          {...additionalOverrideProps}
          locale={getLocale(locale)}
          className={`${prefixCls}-size-${customizeSize} ${prefixCls}-variant-${customizeVariant} ${prefixCls}-color-${customizeColor} ${
            !bordered ? `${prefixCls}-borderless` : ''
          } ${className}`}
          prefixCls={prefixCls}
          getPopupContainer={customizeGetPopupContainer}
          generateConfig={generateConfig}
          prevIcon={<span className={`${prefixCls}-prev-icon`} />}
          nextIcon={<span className={`${prefixCls}-next-icon`} />}
          superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
          superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
          components={Components}
          direction="ltr"
        />
      )
    }

    return withStyle(React.memo(Picker) as React.FC<PickerProps<DateType>>)
  }

  const DatePicker = getPicker<DatePickerProps>()
  const WeekPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('week')
  const MonthPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('month')
  const YearPicker = getPicker<Omit<PickerDateProps<DateType>, 'picker'>>('year')
  const TimePicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>('time')
  const QuarterPicker = getPicker<Omit<PickerTimeProps<DateType>, 'picker'>>('quarter')

  return { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker }
}
