import React, { MouseEvent, useImperativeHandle, useMemo, useRef } from 'react'
import css from 'styled-jsx/css'
import useTheme from '../use-theme'
import { useModalContext } from './modal-context'
import Button, { ButtonProps } from '../button/button'
import useScaleable, { withScaleable } from '../use-scaleable'

type ModalActionEvent = MouseEvent<HTMLButtonElement> & {
  close: () => void
}

interface Props {
  className?: string
  passive?: boolean
  disabled?: boolean
  onClick?: (event: ModalActionEvent) => void
}

const defaultProps = {
  className: '',
  passive: false,
  disabled: false,
}

export type ModalActionProps = Props & Omit<ButtonProps, keyof Props>

const ModalActionComponent = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ModalActionProps>
>(
  (
    {
      className,
      children,
      onClick,
      passive,
      disabled,
      ...props
    }: React.PropsWithChildren<ModalActionProps> & typeof defaultProps,
    ref: React.Ref<HTMLButtonElement | null>,
  ) => {
    const theme = useTheme()
    const { SCALES } = useScaleable()
    const btnRef = useRef<HTMLButtonElement>(null)
    const { close } = useModalContext()
    useImperativeHandle(ref, () => btnRef.current)

    const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      const actionEvent = Object.assign({}, event, {
        close: () => close && close(),
      })
      onClick && onClick(actionEvent)
    }

    const color = useMemo(() => {
      return passive ? theme.palette.accents_5 : theme.palette.foreground
    }, [theme.palette, passive, disabled])

    const bgColor = useMemo(() => {
      return disabled ? theme.palette.accents_1 : theme.palette.background
    }, [theme.palette, disabled])

    const { className: resolveClassName, styles } = css.resolve`
      button.btn {
        font-size: ${SCALES.font(0.75)};
        border: none;
        color: ${color};
        background-color: ${theme.palette.background};
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex: 1;
        height: ${SCALES.height(3.5625)};
        border-radius: 0;
        min-width: 0;
      }
      button.btn:hover,
      button.btn:focus {
        color: ${disabled ? color : theme.palette.foreground};
        background-color: ${disabled ? bgColor : theme.palette.accents_1};
      }
    `

    const overrideProps = {
      ...props,
      effect: false,
      ref: btnRef,
    }

    return (
      <Button
        className={`${resolveClassName} ${className}`}
        onClick={clickHandler}
        disabled={disabled}
        {...overrideProps}>
        {children}
        {styles}
      </Button>
    )
  },
)

ModalActionComponent.defaultProps = defaultProps
ModalActionComponent.displayName = 'GeistModalAction'
const ModalAction = withScaleable(ModalActionComponent)
export default ModalAction
