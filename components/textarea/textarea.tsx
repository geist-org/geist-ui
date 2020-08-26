import React, {
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  TextareaHTMLAttributes,
} from 'react'
import { useTextareaHandle } from '../input/use-input-handle'
import { getColors } from '../input/styles'
import useTheme from '../styles/use-theme'
import { InputColors, InputVariantTypes } from '../utils/prop-types'
import Counter from './counter'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  defaultValue: string
  counter?: boolean
  variant?: InputVariantTypes
  placeholder?: string
  color?: InputColors
  width?: string
  minHeight?: string
  className?: string
}

const defaultProps = {
  variant: 'line' as InputVariantTypes,
  color: 'default' as InputColors,
  width: 'initial',
  minHeight: '6.25rem',
  disabled: false,
  readOnly: false,
  className: '',
}

type NativeAttrs = Omit<React.TextareaHTMLAttributes<any>, keyof Props>
export type TextareaProps = React.PropsWithChildren<Props & NativeAttrs>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      counter,
      maxLength,
      variant,
      width,
      color: textareaColor,
      minHeight,
      disabled,
      readOnly,
      onMouseOut,
      onMouseOver,
      onFocus,
      onBlur,
      className,
      onChange,
      placeholder,
      ...props
    }: TextareaProps & typeof defaultProps,
    ref: React.Ref<HTMLTextAreaElement | null>,
  ) => {
    const isSolid = variant === 'solid'
    const theme = useTheme()
    const hasLimit = useMemo(() => Number.isInteger(maxLength) && (maxLength as number) > 0, [
      maxLength,
    ])
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textareaRef.current)
    const isControlledComponent = useMemo(() => props.value !== undefined, [props.value])
    const [focus, setFocus] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const [count, setCount] = useState<number>(
      isControlledComponent ? (props.value as string).length : props.defaultValue?.length || 0,
    )
    const { color, border, hoverBorderColor, backgroundColor, hoverBackgroundColor } = useMemo(
      () => getColors(theme, textareaColor, isSolid),
      [theme, textareaColor, isSolid],
    )

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(event.target.value?.length)
      if (disabled || readOnly) return
      if (hasLimit && event.target.value.length > (maxLength as number)) return
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

    return (
      <div
        className={`wrapper ${hover ? 'hover' : ''} ${focus ? 'focus' : ''} ${
          isSolid ? 'solid' : 'lined'
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
          {...props}
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

          .wrapper.hover:not(.disabled),
          .wrapper.focus:not(.disabled) {
            border-color: ${hoverBorderColor};
            background-color: ${hoverBackgroundColor};
          }

          .wrapper.disabled {
            color: ${theme.palette.cNeutral2};
            border-color: ${theme.palette.cNeutral2};
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
            padding: calc(${theme.layout.gap} * 0.875) calc(${theme.layout.gap} * 0.75);
          }

          textarea:disabled {
            cursor: not-allowed;
          }

          ::placeholder,
          ::-moz-placeholder,
          :-ms-input-placeholder,
          ::-webkit-textarea-placeholder {
            color: ${theme.palette.cNeutral5};
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

Textarea.defaultProps = defaultProps
const TextareaComponent = Textarea as typeof Textarea & {
  useTextareaHandle: typeof useTextareaHandle
}
TextareaComponent.useTextareaHandle = useTextareaHandle

export { useTextareaHandle }
export default TextareaComponent
