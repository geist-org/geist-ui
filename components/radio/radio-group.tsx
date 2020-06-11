import React, { useEffect, useMemo, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import { RadioContext } from './radio-context'
import { NormalSizes } from 'components/utils/prop-types'

interface Props {
  value?: string | number
  initialValue?: string | number
  disabled?: boolean
  size?: NormalSizes
  onChange?: (value: string | number) => void
  className?: string
  useRow?: boolean
}

const defaultProps = {
  disabled: false,
  size: 'medium' as NormalSizes,
  className: '',
  useRow: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type RadioGroupProps = Props & typeof defaultProps & NativeAttrs

export const getRadioSize = (size: NormalSizes): string => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
  }
  return sizes[size]
}

const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
  disabled,
  onChange,
  value,
  size,
  children,
  className,
  initialValue,
  useRow,
  ...props
}) => {
  const [selfVal, setSelfVal] = useState<string | number | undefined>(initialValue)
  const updateState = (nextValue: string | number) => {
    setSelfVal(nextValue)
    onChange && onChange(nextValue)
  }

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      value: selfVal,
    }
  }, [disabled, selfVal])

  const fontSize = useMemo(() => getRadioSize(size), [size])
  const groupGap = `calc(${fontSize} * 1)`

  useEffect(() => {
    if (value === undefined) return
    setSelfVal(value)
  }, [value])

  return (
    <RadioContext.Provider value={providerValue}>
      <div className={`radio-group ${className}`} {...props}>
        {children}
      </div>
      <style jsx>{`
        .radio-group {
          display: flex;
          flex-direction: ${useRow ? 'col' : 'column'};
        }

        .radio-group :global(.radio) {
          margin-top: ${useRow ? 0 : groupGap};
          margin-left: ${useRow ? groupGap : 0};
          --radio-size: ${fontSize};
        }

        .radio-group :global(.radio:first-of-type) {
          margin: 0;
        }
      `}</style>
    </RadioContext.Provider>
  )
}

export default withDefaults(RadioGroup, defaultProps)
