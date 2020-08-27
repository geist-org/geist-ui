import React, { MouseEvent } from 'react'
import withDefaults from '../utils/with-defaults'
import Button from '../button'
import { ButtonColors, ButtonVariants, NormalSizes } from '../utils/prop-types'
import { useModalContext } from './modal-context'

type ModalActionEvent = MouseEvent<HTMLButtonElement> & {
  close: () => void
}

interface Props {
  variant?: ButtonVariants
  color?: ButtonColors
  size?: NormalSizes
  ghost?: boolean
  loading?: boolean
  shadow?: boolean
  auto?: boolean
  effect?: boolean
  disabled?: boolean
  htmlType?: React.ButtonHTMLAttributes<any>['type']
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: (event: ModalActionEvent) => void
  className?: string
}

const defaultProps = {
  variant: 'line' as ButtonVariants,
  color: 'primary' as ButtonColors,
  size: 'medium' as NormalSizes,
  htmlType: 'button' as React.ButtonHTMLAttributes<any>['type'],
  ghost: false,
  loading: false,
  shadow: false,
  auto: false,
  effect: true,
  disabled: false,
  className: '',
}

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>
export type ModalActionProps = Props & NativeAttrs

const ModalAction: React.FC<ModalActionProps & typeof defaultProps> = ({
  children,
  onClick,
  ...props
}) => {
  const { close } = useModalContext()
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const actionEvent = Object.assign({}, event, {
      close: () => close && close(),
    })
    onClick && onClick(actionEvent)
  }

  return (
    <Button onClick={clickHandler} {...props}>
      {children}
    </Button>
  )
}

export default withDefaults(ModalAction, defaultProps)
