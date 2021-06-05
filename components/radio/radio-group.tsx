import React, { useEffect, useMemo, useState } from 'react'
import { RadioContext } from './radio-context'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  value?: string | number
  initialValue?: string | number
  disabled?: boolean
  onChange?: (value: string | number) => void
  className?: string
  useRow?: boolean
}

const defaultProps = {
  disabled: false,
  className: '',
  useRow: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type RadioGroupProps = Props & NativeAttrs

const RadioGroupComponent: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
  disabled,
  onChange,
  value,
  children,
  className,
  initialValue,
  useRow,
  ...props
}: React.PropsWithChildren<RadioGroupProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()
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
          --radio-group-gap: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .radio-group :global(.radio) {
          margin-top: ${useRow ? 0 : 'var(--radio-group-gap)'};
          margin-left: ${useRow ? 'var(--radio-group-gap)' : 0};
          --radio-size: ${SCALES.font(1)};
        }

        .radio-group :global(.radio:first-of-type) {
          margin: 0;
        }
      `}</style>
    </RadioContext.Provider>
  )
}

RadioGroupComponent.defaultProps = defaultProps
RadioGroupComponent.displayName = 'GeistRadioGroup'
const RadioGroup = withScaleable(RadioGroupComponent)
export default RadioGroup
