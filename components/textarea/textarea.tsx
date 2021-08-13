import React, { useRef, useImperativeHandle, useEffect, useMemo, useState } from 'react'
import useTheme from '../use-theme'
import { NormalTypes, tuple } from '../utils/prop-types'
import { getColors } from '../input/styles'
import useScaleable, { withScaleable } from '../use-scaleable'

const resizeTypes = tuple('none', 'both', 'horizontal', 'vertical', 'initial', 'inherit')
export type TextareaResizes = typeof resizeTypes[number]
export type TextareaTypes = NormalTypes
interface Props {
  value?: string
  initialValue?: string
  placeholder?: string
  type?: TextareaTypes
  disabled?: boolean
  readOnly?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  className?: string
  resize?: TextareaResizes
}

const defaultProps = {
  initialValue: '',
  type: 'default' as TextareaTypes,
  disabled: false,
  readOnly: false,
  className: '',
  resize: 'none' as TextareaResizes,
}

type NativeAttrs = Omit<React.TextareaHTMLAttributes<any>, keyof Props>
export type TextareaProps = Props & NativeAttrs

const TextareaComponent = React.forwardRef<
  HTMLTextAreaElement,
  React.PropsWithChildren<TextareaProps>
>(
  (
    {
      type,
      disabled,
      readOnly,
      onFocus,
      onBlur,
      className,
      initialValue,
      onChange,
      value,
      placeholder,
      resize,
      ...props
    }: React.PropsWithChildren<TextareaProps> & typeof defaultProps,
    ref: React.Ref<HTMLTextAreaElement | null>,
  ) => {
    const theme = useTheme()
    const { SCALES } = useScaleable()
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textareaRef.current)
    const isControlledComponent = useMemo(() => value !== undefined, [value])
    const [selfValue, setSelfValue] = useState<string>(initialValue)
    const [hover, setHover] = useState<boolean>(false)
    const { color, borderColor, hoverBorder } = useMemo(
      () => getColors(theme.palette, type),
      [theme.palette, type],
    )

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
      <div
        className={`wrapper ${hover ? 'hover' : ''} ${
          disabled ? 'disabled' : ''
        } ${className}`}>
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
            border-radius: ${theme.layout.radius};
            border: 1px solid ${borderColor};
            color: ${color};
            transition: border 0.2s ease 0s, color 0.2s ease 0s;
            min-width: 12.5rem;
            max-width: 95vw;
            --textarea-font-size: ${SCALES.font(0.875)};
            --textarea-height: ${SCALES.height(1, 'auto')};
            width: ${SCALES.width(1, 'initial')};
            height: var(--textarea-height);
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
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
            font-size: var(--textarea-font-size);
            width: 100%;
            height: var(--textarea-height);
            border: none;
            outline: none;
            padding: ${SCALES.pt(0.5)} ${SCALES.pr(0.5)} ${SCALES.pb(0.5)}
              ${SCALES.pl(0.5)};
            resize: ${resize};
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

TextareaComponent.defaultProps = defaultProps
TextareaComponent.displayName = 'GeistTextarea'
const Textarea = withScaleable(TextareaComponent)
export default Textarea
