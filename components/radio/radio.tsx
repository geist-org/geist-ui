import React, { useEffect, useMemo, useState } from 'react'
import useTheme from '../use-theme'
import { useRadioContext } from './radio-context'
import RadioDescription from './radio-description'
import { pickChild } from '../utils/collections'
import useWarning from '../utils/use-warning'
import { NormalTypes } from '../utils/prop-types'
import { getColors } from './styles'
import useScaleable, { withScaleable } from '../use-scaleable'

export type RadioTypes = NormalTypes
export interface RadioEventTarget {
  checked: boolean
}
export interface RadioEvent {
  target: RadioEventTarget
  stopPropagation: () => void
  preventDefault: () => void
  nativeEvent: React.ChangeEvent
}

interface Props {
  checked?: boolean
  value?: string | number
  type?: RadioTypes
  className?: string
  disabled?: boolean
  onChange?: (e: RadioEvent) => void
}

const defaultProps = {
  type: 'default' as RadioTypes,
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type RadioProps = Props & NativeAttrs

const RadioComponent: React.FC<React.PropsWithChildren<RadioProps>> = ({
  className,
  checked,
  onChange,
  disabled,
  type,
  value: radioValue,
  children,
  ...props
}: React.PropsWithChildren<RadioProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const [selfChecked, setSelfChecked] = useState<boolean>(!!checked)
  const { value: groupValue, disabledAll, inGroup, updateState } = useRadioContext()
  const [withoutDescChildren, DescChildren] = pickChild(children, RadioDescription)

  if (inGroup) {
    if (checked !== undefined) {
      useWarning('Remove props "checked" if in the Radio.Group.', 'Radio')
    }
    if (radioValue === undefined) {
      useWarning('Props "value" must be deinfed if in the Radio.Group.', 'Radio')
    }
    useEffect(() => {
      setSelfChecked(groupValue === radioValue)
    }, [groupValue, radioValue])
  }

  const { label, border, bg } = useMemo(
    () => getColors(theme.palette, type),
    [theme.palette, type],
  )

  const isDisabled = useMemo(() => disabled || disabledAll, [disabled, disabledAll])
  const changeHandler = (event: React.ChangeEvent) => {
    if (isDisabled) return
    const selfEvent: RadioEvent = {
      target: {
        checked: !selfChecked,
      },
      stopPropagation: event.stopPropagation,
      preventDefault: event.preventDefault,
      nativeEvent: event,
    }
    setSelfChecked(!selfChecked)
    if (inGroup) {
      updateState && updateState(radioValue as string | number)
    }
    onChange && onChange(selfEvent)
  }

  useEffect(() => {
    if (checked === undefined) return
    setSelfChecked(Boolean(checked))
  }, [checked])

  return (
    <div className={`radio ${className}`}>
      <label>
        <input
          type="radio"
          value={radioValue}
          checked={selfChecked}
          onChange={changeHandler}
          {...props}
        />
        <span className="name">
          <span className={`point ${selfChecked ? 'active' : ''}`} />
          {withoutDescChildren}
        </span>
        {DescChildren && DescChildren}
      </label>

      <style jsx>{`
        input {
          opacity: 0;
          visibility: hidden;
          overflow: hidden;
          width: 1px;
          height: 1px;
          top: -1000px;
          right: -1000px;
          position: fixed;
          font-size: 0;
        }

        .radio {
          display: flex;
          align-items: flex-start;
          position: relative;
          --radio-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'initial')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        label {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          color: ${isDisabled ? theme.palette.accents_4 : label};
          cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
        }

        .name {
          font-size: var(--radio-size);
          font-weight: bold;
          user-select: none;
          display: inline-flex;
          align-items: center;
        }

        .point {
          height: var(--radio-size);
          width: var(--radio-size);
          border-radius: 50%;
          border: 1px solid ${border};
          transition: all 0.2s ease 0s;
          position: relative;
          display: inline-block;
          transform: scale(0.875);
          margin-right: calc(var(--radio-size) * 0.375);
        }

        .point:before {
          content: '';
          position: absolute;
          left: -1px;
          top: -1px;
          transform: scale(0);
          height: var(--radio-size);
          width: var(--radio-size);
          border-radius: 50%;
          background-color: ${isDisabled ? theme.palette.accents_4 : bg};
        }

        .point.active:before {
          transform: scale(0.875);
          transition: all 0.2s ease 0s;
        }
      `}</style>
    </div>
  )
}

RadioComponent.defaultProps = defaultProps
RadioComponent.displayName = 'GeistRadio'
const Radio = withScaleable(RadioComponent)
export default Radio
