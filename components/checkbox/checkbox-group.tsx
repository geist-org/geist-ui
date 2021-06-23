import React, { useEffect, useMemo, useState } from 'react'
import { CheckboxContext } from './checkbox-context'
import useWarning from '../utils/use-warning'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  value: string[]
  disabled?: boolean
  onChange?: (values: string[]) => void
  className?: string
}

const defaultProps = {
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CheckboxGroupProps = Props & NativeAttrs

const CheckboxGroupComponent: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = ({
  disabled,
  onChange,
  value,
  children,
  className,
  ...props
}: CheckboxGroupProps & typeof defaultProps) => {
  const { SCALES } = useScaleable()
  const [selfVal, setSelfVal] = useState<string[]>([])
  if (!value) {
    value = []
    useWarning('Props "value" is required.', 'Checkbox Group')
  }

  const updateState = (val: string, checked: boolean) => {
    const removed = selfVal.filter(v => v !== val)
    const next = checked ? [...removed, val] : removed
    setSelfVal(next)
    onChange && onChange(next)
  }

  const providerValue = useMemo(() => {
    return {
      updateState,
      disabledAll: disabled,
      inGroup: true,
      values: selfVal,
    }
  }, [disabled, selfVal])

  useEffect(() => {
    setSelfVal(value)
  }, [value.join(',')])

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div className={`group ${className}`} {...props}>
        {children}
        <style jsx>{`
          .group {
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
          .group :global(label) {
            margin-right: calc(${SCALES.font(1)} * 2);
            --checkbox-size: ${SCALES.font(1)};
          }
          .group :global(label:last-of-type) {
            margin-right: 0;
          }
        `}</style>
      </div>
    </CheckboxContext.Provider>
  )
}

CheckboxGroupComponent.defaultProps = defaultProps
CheckboxGroupComponent.displayName = 'GeistCheckboxGroup'
const CheckboxGroup = withScaleable(CheckboxGroupComponent)

export default CheckboxGroup
