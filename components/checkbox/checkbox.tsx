import React, { useCallback, useEffect, useState } from 'react'
import { useCheckbox } from './checkbox-context'
import CheckboxGroup from './checkbox-group'
import CheckboxIcon from './checkbox.icon'

interface CheckboxEventTarget {
  checked: boolean
}

export interface CheckboxEvent {
  target: CheckboxEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent
}

interface Props {
  checked?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  onChange?: (e: CheckboxEvent) => void
  className?: string
  value?: string
}

const defaultProps = {
  checked: false,
  disabled: false,
  defaultChecked: false,
  className: '',
  value: '',
}

export type CheckboxProps = Props & typeof defaultProps & React.LabelHTMLAttributes<any>

const Checkbox: React.FC<CheckboxProps> = React.memo(({
  checked, defaultChecked, disabled, onChange, className, children, value, ...props
}) => {
  const [selfChecked, setSelfChecked] = useState(defaultChecked)
  const { updateState, inGroup, disabledAll, values } = useCheckbox()
  const isDisabled = inGroup ? disabledAll || disabled : disabled

  if (inGroup && !value) {
    console.error('[Checkbox]: Props "value" must be set when [Checkbox] component is in the group.')
  }
  
  if (inGroup && checked) {
    console.error('[Checkbox]: Remove props "checked" when [Checkbox] component is in the group.')
  }
  
  if (inGroup) {
    useEffect(() => {
      const next = values.includes(value)
      if (next === selfChecked) return
      setSelfChecked(next)
    }, [values.join(',')])
  }

  const changeHandle = useCallback((ev: React.ChangeEvent) => {
    if (isDisabled) return
    const selfEvent: CheckboxEvent = {
      target: {
        checked: !selfChecked,
      },
      stopPropagation: ev.stopPropagation,
      preventDefault: ev.preventDefault,
      nativeEvent: ev,
    }
    if (inGroup && updateState) {
      updateState && updateState(value, !selfChecked)
    }
    
    setSelfChecked(!selfChecked)
    onChange && onChange(selfEvent)
  }, [updateState, onChange, isDisabled, selfChecked])
  
  useEffect(() => {
    setSelfChecked(checked)
  }, [checked])
  
  return (
    <label className={`${className}`} {...props}>
      <CheckboxIcon disabled={isDisabled} checked={selfChecked} />
      <input type="checkbox" disabled={isDisabled} checked={selfChecked} onChange={changeHandle}/>
      <span className="text">{children}</span>
  
      <style jsx>{`
        label {
          height: .875rem;
          line-height: .875rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: auto;
          cursor: ${isDisabled ? 'not-allowed': 'pointer'};
          opacity: ${isDisabled ? .75 : 1};;
        }
        
        .text {
          font-size: .875rem;
          line-height: .875rem;
          padding-left: .5rem;
          user-select: none;
          cursor: ${isDisabled ? 'not-allowed': 'pointer'};
        }
        
        input {
          opacity: 0;
          outline: none;
          position: absolute;
          width: 0;
          height: 0;
          margin: 0;
          padding: 0;
          z-index: -1;
          background-color: transparent;
        }
      `}</style>
    </label>
  )
})


Checkbox.defaultProps = defaultProps

type CheckboxComponent<P = {}> = React.FC<P> & {
  Group: typeof CheckboxGroup
}

type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps>

export default Checkbox as CheckboxComponent<ComponentProps>
