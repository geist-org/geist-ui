import React, { useEffect, useMemo, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import { RadioContext } from './radio-context'
import { NormalSizes } from 'components/utils/prop-types'

interface Props {
  value?: string
  initialValue?: string
  disabled?: boolean
  size?: NormalSizes
  onChange?: (value: string) => void
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

export const getRadioSize = (selfSize: NormalSizes, groupSize?: NormalSizes): string => {
  const size = groupSize || selfSize
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.75rem',
    small: '.875rem',
    medium: '1rem',
    large: '1.125rem',
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
  const [selfVal, setSelfVal] = useState<string | undefined>(initialValue)
  const updateState = (nextValue: string) => {
    setSelfVal(nextValue)
    onChange && onChange(nextValue)
  }

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      size,
      value: selfVal,
    }
  }, [disabled, selfVal, size])

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
        }

        .radio-group :global(.radio:first-of-type) {
          margin: 0;
        }
      `}</style>
    </RadioContext.Provider>
  )
}

export default withDefaults(RadioGroup, defaultProps)
