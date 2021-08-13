import React, { ReactNode } from 'react'
import ButtonIcon from './button-icon'
import { ButtonProps } from './button'
import { ButtonGroupConfig } from '../button-group/button-group-context'

export const getButtonChildrenWithIcon = (
  auto: boolean,
  children: ReactNode,
  icons: {
    icon?: React.ReactNode
    iconRight?: React.ReactNode
  },
) => {
  const { icon, iconRight } = icons
  const hasIcon = icon || iconRight
  const isRight = Boolean(iconRight)
  const paddingForAutoMode = auto
    ? `calc(var(--geist-ui-button-height) / 2 + var(--geist-ui-button-icon-padding) * .5)`
    : 0
  if (!hasIcon) return <div className="text">{children}</div>
  if (React.Children.count(children) === 0) {
    return (
      <ButtonIcon isRight={isRight} isSingle>
        {hasIcon}
      </ButtonIcon>
    )
  }
  return (
    <>
      <ButtonIcon isRight={isRight}>{hasIcon}</ButtonIcon>
      <div className={`text ${isRight ? 'right' : 'left'}`}>
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

export const filterPropsWithGroup = <T extends React.PropsWithChildren<ButtonProps>>(
  props: T,
  config: ButtonGroupConfig,
): T => {
  if (!config.isButtonGroup) return props
  return {
    ...props,
    auto: true,
    shadow: false,
    ghost: config.ghost || props.ghost,
    type: config.type || props.type,
    disabled: config.disabled || props.disabled,
  }
}
