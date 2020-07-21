import React, { useRef, useImperativeHandle, useEffect, useMemo, useState } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { NormalTypes } from '../utils/prop-types'
import { getColors } from '../input/styles'

interface Props {
  value?: string
  initialValue?: string
  placeholder?: string
  status?: NormalTypes
  width?: string
  minHeight?: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  className?: string
}

const defaultProps = {
  initialValue: '',
  status: 'default' as NormalTypes,
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
      width,
      status,
      minHeight,
      disabled,
      readOnly,
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
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textareaRef.current)
    const isControlledComponent = useMemo(() => value !== undefined, [value])
    const [selfValue, setSelfValue] = useState<string>(initialValue)
    const [hover, setHover] = useState<boolean>(false)
    const { color, borderColor, hoverBorder } = useMemo(() => getColors(theme.palette, status), [
      theme.palette,
      status,
    ])

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled || readOnly) return
      setSelfValue(event.target.value)
      onChange && onChange(event)
    }
    const focusHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setHover(true)
      onFocus && onFocus(e)
    }
    const blurHandler = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setHover(false)
      onBlur && onBlur(e)
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

    return (
      <div className={`wrapper ${hover ? 'hover' : ''} ${disabled ? 'disabled' : ''} ${className}`}>
        <textarea
          ref={textareaRef}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
          {...textareaProps}
        />
        <style jsx>{`
          .wrapper {
            display: inline-flex;
            box-sizing: border-box;
            user-select: none;
            width: ${width};
            min-width: 12.5rem;
            max-width: 95vw;
            height: auto;
            border-radius: ${theme.layout.radius};
            border: 1px solid ${borderColor};
            color: ${color};
            transition: border 0.2s ease 0s, color 0.2s ease 0s;
          }

          .wrapper.hover {
            border-color: ${hoverBorder};
          }

          .wrapper.disabled {
            background-color: ${theme.palette.accents_1};
            border-color: ${theme.palette.accents_2};
            cursor: not-allowed;
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

          .disabled > textarea {
            cursor: not-allowed;
          }

          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:active,
          textarea:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
          }
        `}</style>
      </div>
    )
  },
)

export default withDefaults(Textarea, defaultProps)
