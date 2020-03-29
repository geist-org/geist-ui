import React, { useEffect, useMemo, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { RadioContext } from './radio-context'

interface Props {
  value: string
  initialValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
  useRow?: boolean
}

const defaultProps = {
  disabled: false,
  className: '',
  useRow: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type RadioGroupProps = Props & typeof defaultProps & NativeAttrs

const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = React.memo(({
  disabled, onChange, value, children, className, initialValue, useRow, ...props
}) => {
  const theme = useTheme()
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
      value: selfVal,
    }
  },[disabled, selfVal])
  
  useEffect(() => {
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
          margin-top: ${useRow ? 0 : theme.layout.gap};
          margin-left: ${useRow ? theme.layout.gap : 0};
        }
        
        .radio-group :global(.radio:first-of-type) {
          margin: 0;
        }
      `}</style>
    </RadioContext.Provider>
  )
})

export default withDefaults(RadioGroup, defaultProps)
