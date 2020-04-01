import React, { useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import InputLabel from './input-label'
import InputBlockLabel from './input-block-label'
import InputIcon from './input-icon'
import InputClearIcon from './input-icon-clear'
import Textarea from '../textarea/textarea'
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
  clearable?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  autoComplete: string
}

const defaultProps = {
  disabled: false,
  readOnly: false,
  clearable: false,
  width: 'initial',
  size: 'medium',
  status: 'default',
  autoComplete: 'off',
  className: '',
  placeholder: '',
  initialValue: '',
}

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type InputProps = Props & typeof defaultProps & NativeAttrs

const Input: React.FC<React.PropsWithChildren<InputProps>> = ({
  placeholder, label, labelRight, size, status, disabled,
  icon, iconRight, initialValue, onChange, readOnly, value,
  onClearClick, clearable, width, className, onBlur, onFocus,
  autoComplete, children, ...props
}) => {
  const theme = useTheme()
  const [selfValue, setSelfValue] = useState<string>(initialValue)
  const [hover, setHover] = useState<boolean>(false)
  const { heightRatio, fontSize } = useMemo(() => getSizes(size),[size])
  const showClearIcon = useMemo(() => clearable && selfValue !== '', [selfValue, clearable])
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

  const clearHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setSelfValue('')
    onClearClick && onClearClick(event)
  }
  
  const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setHover(true)
    onFocus && onFocus(e)
  }
  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setHover(false)
    onBlur && onBlur(e)
  }

  useEffect(() => {
    if (value === undefined) return
    setSelfValue(value)
  }, [value])

  return (
    <div className="with-label">
      {children && <InputBlockLabel>{children}</InputBlockLabel>}
      <div className={`input-container ${className}`}>
        {label && <InputLabel fontSize={fontSize}>{label}</InputLabel>}
        <div className={`input-wrapper ${hover ? 'hover' : ''} ${disabled ? 'disabled' : ''} ${labelClasses}`}>
          {icon && <InputIcon icon={icon} ratio={heightRatio} />}
          <input type="text" className={`${disabled ? 'disabled' : ''} ${iconClasses}`}
            value={selfValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onChange={changeHandler}
            autoComplete={autoComplete}
            {...props}
          />
          {clearable && <InputClearIcon
            visibale={showClearIcon}
            heightRatio={heightRatio}
            disabled={disabled || readOnly}
            onClick={clearHandler} />}
          {iconRight && <InputIcon icon={iconRight} ratio={heightRatio} />}
        </div>
        {labelRight && <InputLabel fontSize={fontSize} isRight={true}>{labelRight}</InputLabel>}
      </div>
      <style jsx>{`
        .with-label {
          display: inline-block;
          width: ${width};
          box-sizing: border-box;
          -webkit-box-align: center;
        }
        
        .input-container {
          display: inline-flex;
          align-items: center;
          width: ${width};
          height: calc(${heightRatio} * ${theme.layout.gap});
        }

        .input-wrapper {
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          height: 100%;
          flex: 1;
          user-select: none;
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
        
        ::placeholder, ::-moz-placeholder, :-ms-input-placeholder, ::-webkit-input-placeholder {
          color: ${theme.palette.accents_3};
        }
      `}</style>
    </div>
  )
}

type InputComponent<P = {}> = React.FC<P> & {
  Textarea: typeof Textarea
}

type ComponentProps = Partial<typeof defaultProps> & Omit<Props, keyof typeof defaultProps>

(Input as InputComponent<ComponentProps>).defaultProps = defaultProps

export default Input as InputComponent<ComponentProps>
