import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import useTheme from '../use-theme'
import InputLabel from './input-label'
import InputBlockLabel from './input-block-label'
import InputIcon from './input-icon'
import InputClearIcon from './input-icon-clear'
import { getColors } from './styles'
import { Props, defaultProps } from './input-props'
import useScale, { withScale } from '../use-scale'
import useClasses from '../use-classes'

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>
export type InputProps = Props & NativeAttrs

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

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputProps>
>(
  (
    {
      label,
      labelRight,
      type,
      htmlType,
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
      className,
      onBlur,
      onFocus,
      autoComplete,
      placeholder,
      children,
      disabled,
      ...props
    }: React.PropsWithChildren<InputProps> & typeof defaultProps,
    ref: React.Ref<HTMLInputElement | null>,
  ) => {
    const theme = useTheme()
    const { SCALES } = useScale()
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current)

    const [selfValue, setSelfValue] = useState<string>(initialValue)
    const [hover, setHover] = useState<boolean>(false)
    const isControlledComponent = useMemo(() => value !== undefined, [value])
    const labelClasses = useMemo(
      () => (labelRight ? 'right-label' : label ? 'left-label' : ''),
      [label, labelRight],
    )
    const iconClasses = useMemo(
      () => (iconRight ? 'right-icon' : icon ? 'left-icon' : ''),
      [icon, iconRight],
    )
    const { color, borderColor, hoverBorder } = useMemo(
      () => getColors(theme.palette, type),
      [theme.palette, type],
    )

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
        clickable: iconClickable,
        onClick: iconClickHandler,
      }),
      [iconClickable, iconClickHandler],
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
        <div className={useClasses('input-container', className)}>
          {label && <InputLabel>{label}</InputLabel>}
          <div className={useClasses('input-wrapper', { hover, disabled }, labelClasses)}>
            {icon && <InputIcon icon={icon} {...iconProps} />}
            <input
              type={htmlType}
              ref={inputRef}
              className={useClasses({ disabled }, iconClasses)}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              onFocus={focusHandler}
              onBlur={blurHandler}
              onChange={changeHandler}
              autoComplete={autoComplete}
              {...inputProps}
            />
            {clearable && (
              <InputClearIcon
                visible={Boolean(inputRef.current && inputRef.current.value !== '')}
                disabled={disabled || readOnly}
                onClick={clearHandler}
              />
            )}
            {iconRight && <InputIcon icon={iconRight} {...iconProps} />}
          </div>
          {labelRight && <InputLabel isRight={true}>{labelRight}</InputLabel>}
        </div>
        <style jsx>{`
          .with-label {
            display: inline-block;
            box-sizing: border-box;
            -webkit-box-align: center;
            --input-height: ${SCALES.height(2.25)};
            font-size: ${SCALES.font(0.875)};
            width: ${SCALES.width(1, 'initial')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }

          .input-container {
            display: inline-flex;
            align-items: center;
            width: ${SCALES.width(1, 'initial')};
            height: var(--input-height);
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
            margin: 0.25em 0.625em;
            padding: 0;
            box-shadow: none;
            font-size: ${SCALES.font(0.875)};
            background-color: transparent;
            border: none;
            color: ${color};
            outline: none;
            border-radius: 0;
            width: 100%;
            min-width: 0;
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

          ::-ms-reveal {
            display: none !important;
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

InputComponent.defaultProps = defaultProps
InputComponent.displayName = 'GeistInput'
const Input = withScale(InputComponent)
export default Input
