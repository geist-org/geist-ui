import React, { useCallback, useEffect, useMemo, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { NormalSizes } from '../utils/prop-types'

interface ToggleEventTarget {
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
  size?: NormalSizes
  className?: string
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  disabled: false,
  initialChecked: false,
  className: '',
}

type NativeAttrs = Omit<React.LabelHTMLAttributes<any>, keyof Props>
export type ToggleProps = Props & typeof defaultProps & NativeAttrs

export type ToggleSize = {
  width: string
  height: string
}

const getSizes = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: ToggleSize } = {
    mini: {
      width: '1.67rem',
      height: '.835rem',
    },
    small: {
      width: '1.67rem',
      height: '.835rem',
    },
    medium: {
      width: '1.75rem',
      height: '.875rem',
    },
    large: {
      width: '2rem',
      height: '1rem',
    },
  }
  return sizes[size]
}

const Toggle: React.FC<ToggleProps> = ({
  initialChecked,
  checked,
  disabled,
  onChange,
  size,
  className,
  ...props
}) => {
  const theme = useTheme()
  const [selfChecked, setSelfChecked] = useState<boolean>(initialChecked)
  const { width, height } = useMemo(() => getSizes(size), [size])

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

  useEffect(() => {
    if (checked === undefined) return
    setSelfChecked(checked)
  }, [checked])

  return (
    <label className={className} {...props}>
      <input type="checkbox" disabled={disabled} checked={selfChecked} onChange={changeHandle} />
      <div className={`toggle ${selfChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}>
        <span className="inner" />
      </div>
      <style jsx>{`
        label {
          -webkit-tap-highlight-color: transparent;
          display: inline-block;
          vertical-align: center;
          white-space: nowrap;
          user-select: none;
          padding: 3px 0;
          position: relative;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
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
          height: ${height};
          width: ${width};
          border-radius: ${height};
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
          width: calc(${height} - 2px);
          height: calc(${height} - 2px);
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
          background-color: ${theme.palette.success};
        }

        .checked > .inner {
          left: calc(100% - (${height} - 2px));
          box-shadow: none;
        }
      `}</style>
    </label>
  )
}

const MemoToggle = React.memo(Toggle)

export default withDefaults(MemoToggle, defaultProps)
