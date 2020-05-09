import React, {
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import useTheme from '../styles/use-theme'
import InputLabel from './input-label'
import InputBlockLabel from './input-block-label'
import InputIcon from './input-icon'
import InputClearIcon from './input-icon-clear'
import Textarea from '../textarea/textarea'
import InputPassword from './password'
import { getSizes, getColors } from './styles'
import { Props, defaultProps } from './input-props'

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type InputProps = Props & typeof defaultProps & NativeAttrs

const simulateChangeEvent = (
  el: HTMLInputElement,
  event: React.MouseEvent<HTMLDivElement>,
): React.ChangeEvent<HTMLInputElement> => {
  return {
    ...event,
    target: el,
    currentTarget: el,
  }
}

const Input = React.forwardRef<HTMLInputElement, React.PropsWithChildren<InputProps>>(
  (
    {
      label,
      labelRight,
      size,
      status,
      icon,
      iconRight,
      iconClickable,
      onIconClick,
      initialValue,
      onChange,
      readOnly,
      value,
      onClearClick,
      clearable,
      width,
      className,
      onBlur,
      onFocus,
      autoComplete,
      placeholder,
      children,
      disabled,
      ...props
    },
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const theme = useTheme()
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current)

    const [selfValue, setSelfValue] = useState<string>(initialValue)
    const [hover, setHover] = useState<boolean>(false)
    const { heightRatio, fontSize } = useMemo(() => getSizes(size), [size])
    const showClearIcon = useMemo(() => clearable && selfValue !== '', [selfValue, clearable])
    const labelClasses = useMemo(() => (labelRight ? 'right-label' : label ? 'left-label' : ''), [
      label,
      labelRight,
    ])
    const iconClasses = useMemo(() => (iconRight ? 'right-icon' : icon ? 'left-icon' : ''), [
      icon,
      iconRight,
    ])
    const { color, borderColor, hoverBorder } = useMemo(() => getColors(theme.palette, status), [
      theme.palette,
      status,
    ])
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return
      setSelfValue(event.target.value)
      onChange && onChange(event)
    }

    const clearHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      setSelfValue('')
      onClearClick && onClearClick(event)
      /* istanbul ignore next */
      if (!inputRef.current) return

      const changeEvent = simulateChangeEvent(inputRef.current, event)
      changeEvent.target.value = ''
      onChange && onChange(changeEvent)
      inputRef.current.focus()
    }

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(true)
      onFocus && onFocus(e)
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setHover(false)
      onBlur && onBlur(e)
    }

    const iconClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onIconClick && onIconClick(e)
    }
    const iconProps = useMemo(
      () => ({
        ratio: heightRatio,
        clickable: iconClickable,
        onClick: iconClickHandler,
      }),
      [heightRatio, iconClickable],
    )

    useEffect(() => {
      if (value === undefined) return
      setSelfValue(value)
    }, [value])

    return (
      <div className="with-label">
        {children && <InputBlockLabel>{children}</InputBlockLabel>}
        <div className={`input-container ${className}`}>
          {label && <InputLabel fontSize={fontSize}>{label}</InputLabel>}
          <div
            className={`input-wrapper ${hover ? 'hover' : ''} ${
              disabled ? 'disabled' : ''
            } ${labelClasses}`}>
            {icon && <InputIcon icon={icon} {...iconProps} />}
            <input
              type="text"
              ref={inputRef}
              className={`${disabled ? 'disabled' : ''} ${iconClasses}`}
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
            {clearable && (
              <InputClearIcon
                visibale={showClearIcon}
                heightRatio={heightRatio}
                disabled={disabled || readOnly}
                onClick={clearHandler}
              />
            )}
            {iconRight && <InputIcon icon={iconRight} {...iconProps} />}
          </div>
          {labelRight && (
            <InputLabel fontSize={fontSize} isRight={true}>
              {labelRight}
            </InputLabel>
          )}
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

          ::placeholder,
          ::-moz-placeholder,
          :-ms-input-placeholder,
          ::-webkit-input-placeholder {
            color: ${theme.palette.accents_3};
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:active,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
            -webkit-text-fill-color: ${color} !important;
          }
        `}</style>
      </div>
    )
  },
)

type InputComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Textarea: typeof Textarea
  Password: typeof InputPassword
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Input.defaultProps = defaultProps

export default Input as InputComponent<HTMLInputElement, ComponentProps>
