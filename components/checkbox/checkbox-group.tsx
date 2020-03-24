import React, { useEffect, useMemo, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import { CheckboxContext } from './checkbox-context'
import useWarning from '../utils/use-warning'

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

export type CheckboxGroupProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const CheckboxGroup: React.FC<React.PropsWithChildren<CheckboxGroupProps>> = React.memo(({
  disabled, onChange, value, children, className, ...props
}) => {
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
  },[disabled, selfVal])
  
  useEffect(() => {
    setSelfVal(value)
  }, [value.join(',')])

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div className={`group ${className}`} {...props}>
        {children}
        <style jsx>{`
        .group :global(label) {
          margin-right: 1.875rem;
        }
      `}</style>
      </div>
    </CheckboxContext.Provider>
  )
})

export default withDefaults(CheckboxGroup, defaultProps)
