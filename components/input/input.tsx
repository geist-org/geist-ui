import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import useTheme from '../styles/use-theme'
import Textarea from '../textarea/textarea'
import InputBlockLabel from './input-block-label'
import InputIcon from './input-icon'
import InputClearIcon from './input-icon-clear'
import InputLabel from './input-label'
import { defaultProps, Props } from './input-props'
import InputPassword from './password'
import { getColors, getSizes } from './styles'
import { useInputHandle } from './use-input-handle'
import { useAutoCompleteContext } from '../auto-complete/auto-complete-context'

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type InputProps = React.PropsWithChildren<Props & NativeAttrs>
export { defaultProps }

export interface InputImperativeHandles {
  getValue(): string
  setValue(value?: string): void
  focus(): void
  blur(): void
}

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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      label,
      labelRight,
      size,
      htmlSize,
      color: inputColor,
      icon,
      iconRight,
      iconClickable,
      onIconClick,
      onChange,
      readOnly,
      onClearClick,
      clearable,
      width,
      htmlWidth,
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
    }: InputProps & typeof defaultProps,
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const theme = useTheme()
    const isSolid = variant === 'solid'
    const inputRef = useRef<HTMLInputElement>(null)
    const isControlled = props.value !== undefined

    const [focus, setFocus] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const { heightRatio, fontSize, margin } = useMemo(() => getSizes(size), [size])
    const { ref: autoCompleteRef, focus: autoCompleteFocus } = useAutoCompleteContext()
    const inAutoComplete = Boolean(autoCompleteRef && autoCompleteRef.current)
    const labelClasses = useMemo(() => (labelRight ? 'right-label' : label ? 'left-label' : ''), [
      label,
      labelRight,
    ])
    const iconClasses = useMemo(() => (iconRight ? 'right-icon' : icon ? 'left-icon' : ''), [
      icon,
      iconRight,
    ])

    useImperativeHandle(ref, () => inputRef.current)

    const {
      color,
      hoverColor,
      border,
      hoverBorderColor,
      backgroundColor,
      hoverBackgroundColor,
    } = useMemo(() => getColors(theme, inputColor, isSolid), [theme, inputColor, isSolid])

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return
      onChange && onChange(event)
    }
    const clearHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      /* istanbul ignore next */
      if (!inputRef.current) return
      if (disabled || readOnly) return

      if (!isControlled) inputRef.current.value = ''

      onClearClick && onClearClick(event)

      if (!isControlled) {
        const changeEvent = simulateChangeEvent(inputRef.current, event)
        changeEvent.target.value = ''
        onChange && onChange(changeEvent)
      }

      inputRef.current.focus()
    }
    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(true)
      onFocus && onFocus(e)
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      if (inAutoComplete && autoCompleteFocus) return
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
      if (!autoCompleteFocus) {
        setFocus(false)
      }
    }, [autoCompleteFocus])

    const inputProps = {
      ...props,
    }

    return (
      <div className="with-label">
        {children && <InputBlockLabel htmlFor={props.id}>{children}</InputBlockLabel>}
        <div className={`input-container ${className}`}>
          {label && (
            <InputLabel htmlFor={props.id} variant={variant} fontSize={fontSize}>
              {label}
            </InputLabel>
          )}
          <div
            className={`input-wrapper ${isSolid ? 'solid' : 'line'} ${hover ? 'hover' : ''} ${
              focus ? 'focus' : ''
            } ${disabled ? 'disabled' : ''} ${labelClasses}`}>
            {icon && <InputIcon paddingRight="0.5714rem" icon={icon} {...iconProps} />}
            <input
              type="text"
              size={htmlSize}
              ref={inputRef}
              width={htmlWidth}
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
            <InputLabel htmlFor={props.id} variant={variant} fontSize={fontSize} isRight={true}>
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
            border: 0;
            background-color: ${theme.palette.cNeutral2};
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
            color: ${theme.palette.cNeutral4};
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
            color: ${theme.palette.cNeutral5};
          }

          input::-moz-placeholder {
            line-height: calc(${heightRatio} * ${theme.layout.gap} - 1px);
          }

          input:-webkit-autofill,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px ${backgroundColor} inset !important;
            -webkit-text-fill-color: ${color} !important;
          }

          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${hoverBackgroundColor} inset !important;
            -webkit-text-fill-color: ${hoverColor} !important;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-background-clip: text;
          }
        `}</style>
      </div>
    )
  },
)

Input.defaultProps = defaultProps

const InputComponent = Input as typeof Input & {
  Textarea: typeof Textarea
  Password: typeof InputPassword
  useInputHandle: typeof useInputHandle
}

InputComponent.Textarea = Textarea
InputComponent.Password = InputPassword
InputComponent.useInputHandle = useInputHandle

export default InputComponent
export { useInputHandle }
