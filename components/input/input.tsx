import React, { useEffect, useMemo, useState } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import InputLabel from './input-label'
import InputIcon from './input-icon'
import { getSizes, getColors } from './styles'
import { NormalSizes, NormalTypes } from '../utils/prop-types'

interface Props {
  value?: string
  initialValue?: string
  placeholder?: string
  size?: NormalSizes
  status?: NormalTypes
  readOnly?: boolean
  disabled?: boolean
  label?: string
  labelRight?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  width?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const defaultProps = {
  disabled: false,
  readOnly: false,
  width: 'initial',
  size: 'medium',
  status: 'default',
  className: '',
  placeholder: '',
  initialValue: '',
}

export type InputProps = Props & typeof defaultProps & React.InputHTMLAttributes<any>

const Input: React.FC<InputProps> = ({
  placeholder, label, labelRight, size, status, disabled,
  icon, iconRight, initialValue, onChange, readOnly, value,
  width, className, ...props
}) => {
  const theme = useTheme()
  const [selfValue, setSelfValue] = useState<string>(initialValue)
  const [hover, setHover] = useState<boolean>(false)
  const { heightRatio, fontSize } = useMemo(() => getSizes(size),[size])
  const labelClasses = useMemo(
    () =>  labelRight ? 'right-label' : (label ? 'left-label' : ''),
    [label, labelRight],
  )
  const iconClasses = useMemo(
    () =>  iconRight ? 'right-icon' : (icon ? 'left-icon' : ''),
    [icon, iconRight],
  )
  const { color, borderColor, hoverBorder } = useMemo(
    () => getColors(theme.palette, status),
    [theme.palette, status],
  )
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return
    setSelfValue(event.target.value)
    onChange && onChange(event)
  }

  useEffect(() => {
    if (value === undefined) return
    setSelfValue(value)
  }, [value])

  return (
    <div className={`input-container ${className}`}>
      {label && <InputLabel fontSize={fontSize}>{label}</InputLabel>}
      <div className={`input-wrapper ${hover ? 'hover' : ''} ${disabled ? 'disabled' : ''} ${labelClasses}`}>
        {icon && <InputIcon icon={icon} ratio={heightRatio} />}
        <input type="text" className={`${disabled ? 'disabled' : ''} ${iconClasses}`}
          value={selfValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          onChange={changeHandler}
          {...props}
        />
        {iconRight && <InputIcon icon={iconRight} ratio={heightRatio} />}
      </div>
      {labelRight && <InputLabel fontSize={fontSize} isRight={true}>{labelRight}</InputLabel>}
  
      <style jsx>{`
        .input-container {
          display: inline-flex;
          align-items: center;
          box-sizing: border-box;
          user-select: none;
          width: ${width};
          height: calc(${heightRatio} * ${theme.layout.gap});
        }

        .input-wrapper {
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          flex: 1;
          height: 100%;
          border-radius: ${theme.layout.radius};
          border: 1px solid ${borderColor};
          transition: border 0.2s ease 0s, color 0.2s ease 0s;
        }
        
        .input-wrapper.left-label {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        
        .input-wrapper.right-label {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        
        .input-wrapper.disabled {
          background-color: ${theme.palette.accents_1};
          border-color: ${theme.palette.accents_2};
          cursor: not-allowed;
        }
        
        input.disabled {
          cursor: not-allowed;
        }
        
        .input-wrapper.hover {
          border-color: ${hoverBorder};
        }

        input {
          margin: 4px 10px;
          padding: 0;
          box-shadow: none;
          line-height: 1.625rem;
          font-size: ${fontSize};
          background-color: transparent;
          border: none;
          color: ${color};
          outline: none;
          border-radius: 0;
          width: 100%;
          -webkit-appearance: none;
        }
        
        input.left-icon {
          margin-left: 0;
        }
        
        input.right-icon {
          margin-right: 0;
        }
        
        input::placeholder {
          color: ${theme.palette.accents_3};
        }
      `}</style>
    </div>
  )
}

export default withDefaults(Input, defaultProps)
