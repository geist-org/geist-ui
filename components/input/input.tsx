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
      solid,
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
      onMouseOver,
      onMouseOut,
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
    const [focus, setFocus] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const { heightRatio, fontSize, margin } = useMemo(() => getSizes(size), [size])
    const isControlledComponent = useMemo(() => value !== undefined, [value])
    const labelClasses = useMemo(() => (labelRight ? 'right-label' : label ? 'left-label' : ''), [
      label,
      labelRight,
    ])
    const iconClasses = useMemo(() => (iconRight ? 'right-icon' : icon ? 'left-icon' : ''), [
      icon,
      iconRight,
    ])
    const {
      color,
      hoverColor,
      border,
      hoverBorderColor,
      backgroundColor,
      hoverBackgroundColor,
    } = useMemo(() => getColors(theme.palette, status, solid), [theme.palette, status])
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
      setFocus(true)
      onFocus && onFocus(e)
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(false)
      onBlur && onBlur(e)
    }
    const mouseOverHandler = (e: React.MouseEvent<HTMLInputElement>) => {
      setHover(true)
      onMouseOver && onMouseOver(e)
    }
    const mouseOutHandler = (e: React.MouseEvent<HTMLInputElement>) => {
      setHover(false)
      onMouseOut && onMouseOut(e)
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
      [heightRatio, iconClickable, iconClickHandler],
    )

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string)
      }
    })

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue }
    const inputProps = {
      ...props,
      ...controlledValue,
    }

    return (
      <div className="with-label">
        {children && <InputBlockLabel>{children}</InputBlockLabel>}
        <div className={`input-container ${className}`}>
          {label && <InputLabel fontSize={fontSize}>{label}</InputLabel>}
          <div
            className={`input-wrapper ${solid ? 'solid' : 'lined'} ${hover ? 'hover' : ''} ${
              focus ? 'focus' : ''
            } ${disabled ? 'disabled' : ''} ${labelClasses}`}>
            {icon && <InputIcon paddingRight="0.5714rem" icon={icon} {...iconProps} />}
            <input
              type="text"
              ref={inputRef}
              className={`${iconClasses}`}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              onFocus={focusHandler}
              onMouseOver={mouseOverHandler}
              onMouseOut={mouseOutHandler}
              onBlur={blurHandler}
              onChange={changeHandler}
              autoComplete={autoComplete}
              {...inputProps}
            />
            {clearable && (
              <InputClearIcon
                visible={Boolean(inputRef.current && inputRef.current.value !== '')}
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
            border-radius: ${theme.expressiveness.R2};
            transition: border 0.2s ease 0s, color 0.2s ease 0s;
            background-color: ${backgroundColor};
            border: ${border};
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
            cursor: not-allowed;
          }

          .lined.input-wrapper.disabled {
            border-color: ${theme.palette.cGray2};
          }

          .solid.input-wrapper.disabled {
            background-color: ${theme.palette.cGray3};
          }

          .focus.input-wrapper:not(.disabled),
          .hover.input-wrapper:not(.disabled) {
            border-color: ${hoverBorderColor};
            background-color: ${hoverBackgroundColor};
          }

          input {
            margin: ${margin};
            padding: 0;
            box-shadow: none;
            font-size: ${fontSize};
            line-height: calc(${heightRatio} * ${theme.layout.gap} - 2px);
            background-color: transparent;
            font-weight: normal;
            border: none;
            color: ${color};
            outline: none;
            border-radius: 0;
            width: 100%;
            min-width: 0;
            -webkit-appearance: none;
          }

          input:disabled {
            cursor: not-allowed;
            color: ${theme.palette.cGray4};
          }

          input.left-icon {
            margin-left: 0;
          }

          input.right-icon {
            margin-right: 0;
          }

          .input-wrapper.focus:not(.disabled) input,
          .input-wrapper.hover:not(.disabled) input {
            color: ${hoverColor};
          }

          ::placeholder,
          ::-moz-placeholder,
          :-ms-input-placeholder,
          ::-webkit-input-placeholder {
            color: ${theme.palette.cGray5};
          }

          input::-moz-placeholder {
            line-height: calc(${heightRatio} * ${theme.layout.gap} - 1px);
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
