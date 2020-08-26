import React, { ReactNode } from 'react'
import { NormalSizes } from '../utils/prop-types'
import ButtonIcon from './button-icon'
import { ButtonProps } from './button'
import { ButtonGroupConfig } from '../button-group/button-group-context'

export const getButtonChildrenWithIcon = (
  loading: boolean,
  auto: boolean,
  size: NormalSizes,
  children: ReactNode,
  icons: {
    icon?: React.ReactNode
    iconRight?: React.ReactNode
  },
  isTag: boolean,
) => {
  const { icon, iconRight } = icons
  const hasIcon = icon || iconRight
  const isRight = Boolean(iconRight)
  const paddingForAutoMode =
    auto || size === 'mini' || isTag
      ? `calc(var(--zeit-ui-button-height) / 2 + var(--zeit-ui-button-padding) * .5)`
      : 0
  if (!hasIcon) return <div className={`text ${loading ? 'hidden' : ''}`}>{children}</div>
  return (
    <>
      <ButtonIcon isRight={isRight}>{hasIcon}</ButtonIcon>
      <div className={`text ${isRight ? 'right' : 'left'} ${loading ? 'hidden' : ''}`}>
        {children}
        <style jsx>{`
          .left {
            padding-left: ${paddingForAutoMode};
          }
          .right {
            padding-right: ${paddingForAutoMode};
          }
        `}</style>
      </div>
    </>
  )
}

export const filterPropsWithGroup = (
  props: React.PropsWithChildren<ButtonProps>,
  config: ButtonGroupConfig,
): ButtonProps => {
  if (!config.isButtonGroup) return props
  return {
    ...props,
    auto: true,
    shadow: false,
    ghost: config.ghost || props.ghost,
    size: config.size || props.size,
    variant: config.variant || props.variant,
    color: config.color || props.color,
    disabled: config.disabled || props.disabled,
  }
}
