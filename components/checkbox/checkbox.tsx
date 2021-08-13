import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useCheckbox } from './checkbox-context'
import CheckboxIcon from './checkbox.icon'
import useWarning from '../utils/use-warning'
import { NormalTypes } from '../utils/prop-types'
import { getColors } from './styles'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

export type CheckboxTypes = NormalTypes
export interface CheckboxEventTarget {
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
  type?: CheckboxTypes
  initialChecked?: boolean
  onChange?: (e: CheckboxEvent) => void
  className?: string
  value?: string
}

const defaultProps = {
  disabled: false,
  type: 'default' as CheckboxTypes,
  initialChecked: false,
  className: '',
  value: '',
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type CheckboxProps = Props & NativeAttrs

const CheckboxComponent: React.FC<CheckboxProps> = ({
  checked,
  initialChecked,
  disabled,
  onChange,
  className,
  children,
  type,
  value,
  ...props
}: CheckboxProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked)
  const { updateState, inGroup, disabledAll, values } = useCheckbox()
  const isDisabled = inGroup ? disabledAll || disabled : disabled

  if (inGroup && checked) {
    useWarning(
      'Remove props "checked" when [Checkbox] component is in the group.',
      'Checkbox',
    )
  }
  if (inGroup) {
    useEffect(() => {
      const next = values.includes(value)
      if (next === selfChecked) return
      setSelfChecked(next)
    }, [values.join(',')])
  }

  const { fill, bg } = useMemo(
    () => getColors(theme.palette, type),
    [theme.palette, type],
  )

  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
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
    },
    [updateState, onChange, isDisabled, selfChecked],
  )

  useEffect(() => {
    if (checked === undefined) return
    setSelfChecked(checked)
  }, [checked])

  return (
    <label className={`checkbox ${className}`}>
      <CheckboxIcon fill={fill} bg={bg} disabled={isDisabled} checked={selfChecked} />
      <input
        type="checkbox"
        disabled={isDisabled}
        checked={selfChecked}
        onChange={changeHandle}
        {...props}
      />
      <span className="text">{children}</span>

      <style jsx>{`
        .checkbox {
          --checkbox-size: ${SCALES.font(0.875)};
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
          opacity: ${isDisabled ? 0.75 : 1};
          line-height: var(--checkbox-size);
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'var(--checkbox-size)')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .text {
          font-size: var(--checkbox-size);
          line-height: var(--checkbox-size);
          padding-left: calc(var(--checkbox-size) * 0.5);
          user-select: none;
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
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
          font-size: 0;
          background-color: transparent;
        }
      `}</style>
    </label>
  )
}

CheckboxComponent.defaultProps = defaultProps
CheckboxComponent.displayName = 'GeistCheckbox'
const Checkbox = withScaleable(CheckboxComponent)
export default Checkbox
