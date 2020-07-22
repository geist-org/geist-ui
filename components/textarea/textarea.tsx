import React, { useRef, useImperativeHandle, useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { InputTypes } from '../utils/prop-types'
import { getColors } from '../input/styles'
import Counter from './counter'

interface Props {
  counter?: boolean
  maxLength?: number
  solid?: boolean
  value?: string
  initialValue?: string
  placeholder?: string
  status?: InputTypes
  width?: string
  minHeight?: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onMouseOver?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void
  onMouseOut?: (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void
  className?: string
}

const defaultProps = {
  initialValue: '',
  status: 'default' as InputTypes,
  width: 'initial',
  minHeight: '6.25rem',
  disabled: false,
  readOnly: false,
  className: '',
}

type NativeAttrs = Omit<React.TextareaHTMLAttributes<any>, keyof Props>
export type TextareaProps = Props & typeof defaultProps & NativeAttrs

const Textarea = React.forwardRef<HTMLTextAreaElement, React.PropsWithChildren<TextareaProps>>(
  (
    {
      counter,
      maxLength,
      solid,
      width,
      status,
      minHeight,
      disabled,
      readOnly,
      onMouseOut,
      onMouseOver,
      onFocus,
      onBlur,
      className,
      initialValue,
      onChange,
      value,
      placeholder,
      ...props
    },
    ref: React.Ref<HTMLTextAreaElement | null>,
  ) => {
    const theme = useTheme()
    const hasLimit = useMemo(() => Number.isInteger(maxLength) && (maxLength as number) > 0, [
      maxLength,
    ])
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textareaRef.current)
    const isControlledComponent = useMemo(() => value !== undefined, [value])
    const [selfValue, setSelfValue] = useState<string>(initialValue)
    const [focus, setFocus] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const { color, border, hoverBorderColor, backgroundColor, hoverBackgroundColor } = useMemo(
      () => getColors(theme.palette, status, solid),
      [theme.palette, status],
    )

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled || readOnly) return
      if (hasLimit && event.target.value.length > (maxLength as number)) return
      setSelfValue(event.target.value)
      onChange && onChange(event)
    }
    const focusHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocus(true)
      onFocus && onFocus(e)
    }
    const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocus(false)
      onBlur && onBlur(e)
    }
    const mouseOverHandler = (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
      setHover(true)
      onMouseOver && onMouseOver(e)
    }
    const mouseOutHandler = (e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
      setHover(false)
      onMouseOut && onMouseOut(e)
    }

    useEffect(() => {
      if (isControlledComponent) {
        setSelfValue(value as string)
      }
    })

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue }
    const textareaProps = {
      ...props,
      ...controlledValue,
    }

    const count = selfValue.length

    return (
      <div
        className={`wrapper ${hover ? 'hover' : ''} ${focus ? 'focus' : ''} ${
          solid ? 'solid' : 'lined'
        } ${disabled ? 'disabled' : ''} ${className}`}>
        <textarea
          ref={textareaRef}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseOutHandler}
          onChange={changeHandler}
          maxLength={maxLength}
          {...textareaProps}
        />
        {counter && <Counter count={count} maxLength={maxLength} />}
        <style jsx>{`
          .wrapper {
            position: ${counter ? 'relative' : 'inherit'};
            display: inline-flex;
            box-sizing: border-box;
            user-select: none;
            width: ${width};
            min-width: 12.5rem;
            max-width: 95vw;
            height: auto;
            border-radius: ${theme.expressiveness.R2};
            color: ${color};
            transition: border 0.2s ease 0s, color 0.2s ease 0s;
            background-color: ${backgroundColor};
            border: ${border};
          }

          .wrapper.hover,
          .wrapper.focus {
            border-color: ${hoverBorderColor};
            background-color: ${hoverBackgroundColor};
          }

          .wrapper.disabled {
            color: ${theme.palette.cGray2};
            border-color: ${theme.palette.cGray2};
            cursor: not-allowed;
            opacity: 0.5;
          }

          textarea {
            background-color: transparent;
            box-shadow: none;
            display: block;
            font-family: ${theme.font.sans};
            font-size: 0.875rem;
            width: 100%;
            height: 100%;
            min-height: ${minHeight};
            resize: none;
            border: none;
            outline: none;
            padding: ${theme.layout.gapHalf};
          }

          textarea:disabled {
            cursor: not-allowed;
          }

          textarea:-webkit-autofill,
          textarea:-webkit-autofill:active,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus {
            -webkit-background-clip: text;
          }

          textarea:-webkit-autofill,
          textarea:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
          }
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${hoverBackgroundColor} inset !important;
          }
        `}</style>
      </div>
    )
  },
)

export default withDefaults(Textarea, defaultProps)
