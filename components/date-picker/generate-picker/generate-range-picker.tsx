import * as React from 'react'
import { useMemo } from 'react'
import { Calendar, Clock, Minus } from '@zeit-ui/react-icons'
import { RangePicker as RCRangePicker } from '@jnoodle/rc-picker'
import { GenerateConfig } from '@jnoodle/rc-picker/lib/generate'
import { getLocale, getRangePlaceholder } from '../util'
import { Components, getTimeProps, RangePickerProps } from '.'
import InputClearIcon from '../../input/input-icon-clear'
import InputIcon from '../../input/input-icon'
import { getSizes } from '../../input/styles'
import withStyle from './with-style'

export default function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  const Picker: React.FC<RangePickerProps<DateType>> = props => {
    const {
      forwardedRef,
      prefixCls: customizePrefixCls,
      getPopupContainer: customGetPopupContainer,
      className = '',
      locale = 'en-US',
      size: customizeSize = 'medium',
      variant: customizeVariant = 'line',
      color: customizeColor = 'default',
      bordered = true,
      placeholder,
      ...restProps
    } = props
    const { format, showTime, picker } = props as any
    const prefixCls = `${customizePrefixCls || 'cfx'}-picker`
    const { heightRatio: inputHeightRatio } = useMemo(() => getSizes(customizeSize), [
      customizeSize,
    ])

    let additionalOverrideProps: any = {}

    additionalOverrideProps = {
      ...additionalOverrideProps,
      ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
      ...(picker === 'time' ? getTimeProps({ format, ...props, picker }) : {}),
    }

    return (
      <RCRangePicker<DateType>
        ref={forwardedRef}
        separator={
          <span aria-label="to" className={`${prefixCls}-separator`}>
            <Minus />
          </span>
        }
        placeholder={getRangePlaceholder(picker, locale, placeholder)}
        suffixIcon={
          picker === 'time' ? (
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
        {...restProps}
        {...additionalOverrideProps}
        className={`${prefixCls}-size-${customizeSize} ${prefixCls}-variant-${customizeVariant} ${prefixCls}-color-${customizeColor} ${
          !bordered ? `${prefixCls}-borderless` : ''
        } ${className}`}
        locale={getLocale(locale)}
        prefixCls={prefixCls}
        getPopupContainer={customGetPopupContainer}
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
  return withStyle<DateType>(React.memo(Picker) as React.FC<RangePickerProps<DateType>>)
}
