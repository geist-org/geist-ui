import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useTheme from '../use-theme'
import { NormalTypes } from '../utils/prop-types'
import { getColors } from './styles'
import useScaleable, { withScaleable } from '../use-scaleable'

export type ToggleTypes = NormalTypes
export interface ToggleEventTarget {
  checked: boolean
}
export interface ToggleEvent {
  target: ToggleEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent
}

interface Props {
  checked?: boolean
  initialChecked?: boolean
  onChange?: (ev: ToggleEvent) => void
  disabled?: boolean
  type?: ToggleTypes
  className?: string
}

const defaultProps = {
  type: 'default' as ToggleTypes,
  disabled: false,
  initialChecked: false,
  className: '',
}

type NativeAttrs = Omit<React.LabelHTMLAttributes<any>, keyof Props>
export type ToggleProps = Props & NativeAttrs

export type ToggleSize = {
  width: string
  height: string
}

const ToggleComponent: React.FC<ToggleProps> = ({
  initialChecked,
  checked,
  disabled,
  onChange,
  type,
  className,
  ...props
}: ToggleProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked)

  const changeHandle = useCallback(
    (ev: React.ChangeEvent) => {
      if (disabled) return
      const selfEvent: ToggleEvent = {
        target: {
          checked: !selfChecked,
        },
        stopPropagation: ev.stopPropagation,
        preventDefault: ev.preventDefault,
        nativeEvent: ev,
      }

      setSelfChecked(!selfChecked)
      onChange && onChange(selfEvent)
    },
    [disabled, selfChecked, onChange],
  )

  const { bg } = useMemo(() => getColors(theme.palette, type), [theme.palette, type])

  useEffect(() => {
    if (checked === undefined) return
    setSelfChecked(checked)
  }, [checked])

  return (
    <label className={className} {...props}>
      <input
        type="checkbox"
        disabled={disabled}
        checked={selfChecked}
        onChange={changeHandle}
      />
      <div
        className={`toggle ${selfChecked ? 'checked' : ''} ${
          disabled ? 'disabled' : ''
        }`}>
        <span className="inner" />
      </div>
      <style jsx>{`
        label {
          -webkit-tap-highlight-color: transparent;
          display: inline-block;
          vertical-align: middle;
          white-space: nowrap;
          user-select: none;
          position: relative;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          --toggle-font-size: ${SCALES.font(1)};
          --toggle-height: ${SCALES.height(0.875)};
          width: ${SCALES.width(1.75)};
          height: var(--toggle-height);
          padding: ${SCALES.pt(0.1875)} ${SCALES.pr(0)} ${SCALES.pb(0.1875)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        input {
          overflow: hidden;
          visibility: hidden;
          height: 0;
          opacity: 0;
          width: 0;
          position: absolute;
          background-color: transparent;
          z-index: -1;
        }

        .toggle {
          height: var(--toggle-height);
          width: 100%;
          border-radius: var(--toggle-height);
          transition-delay: 0.12s;
          transition-duration: 0.2s;
          transition-property: background, border;
          transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
          position: relative;
          border: 1px solid transparent;
          background-color: ${theme.palette.accents_2};
          padding: 0;
        }

        .inner {
          width: calc(var(--toggle-height) - 2px);
          height: calc(var(--toggle-height) - 2px);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 1px;
          box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0, rgba(0, 0, 0, 0.1) 0 1px 3px 0;
          transition: left 280ms cubic-bezier(0, 0, 0.2, 1);
          border-radius: 50%;
          background-color: ${theme.palette.background};
        }

        .disabled {
          border-color: ${theme.palette.accents_2};
          background-color: ${theme.palette.accents_1};
        }

        .disabled > .inner {
          background-color: ${theme.palette.accents_2};
        }

        .disabled.checked {
          border-color: ${theme.palette.accents_4};
          background-color: ${theme.palette.accents_4};
        }

        .checked {
          background-color: ${bg};
        }

        .checked > .inner {
          left: calc(100% - (var(--toggle-height) - 2px));
          box-shadow: none;
        }
      `}</style>
    </label>
  )
}

ToggleComponent.defaultProps = defaultProps
ToggleComponent.displayName = 'GeistToggle'
const Toggle = withScaleable(ToggleComponent)
export default Toggle
