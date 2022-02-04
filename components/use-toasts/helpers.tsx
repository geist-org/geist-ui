import { Toast, ToastAction } from './use-toast'
import React from 'react'
import Button from '../button'
import { GeistUIThemesPalette } from '../themes'
import { NormalTypes, tuple } from '../utils/prop-types'

export const makeToastActions = (actions: Toast['actions'], cancelHandle: () => void) => {
  const handler = (
    event: React.MouseEvent<HTMLButtonElement>,
    userHandler: ToastAction['handler'],
  ) => {
    userHandler && userHandler(event, cancelHandle)
  }
  if (!actions || !actions.length) return null
  return actions.map((action, index) => (
    <Button
      auto
      scale={1 / 3}
      font="13px"
      type={action.passive ? 'default' : 'secondary'}
      key={`action-${index}`}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
        handler(event, action.handler)
      }>
      {action.name}
    </Button>
  ))
}

export const getColors = (palette: GeistUIThemesPalette, type?: NormalTypes) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.background,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }
  const isDefault = !type || type === 'default'
  if (isDefault)
    return {
      bgColor: colors.default,
      color: palette.foreground,
    }
  /**
   * Prevent main color change in special types.
   * The color will only follow the theme when it is in the default type.
   */
  return {
    bgColor: colors[type as NormalTypes],
    color: 'white',
  }
}

const toastPlacement = tuple('topLeft', 'topRight', 'bottomLeft', 'bottomRight')
export type ToastPlacement = typeof toastPlacement[number]

export const isTopPlacement = (placement: ToastPlacement) =>
  `${placement}`.toLowerCase().startsWith('top')
export const isLeftPlacement = (placement: ToastPlacement) =>
  `${placement}`.toLowerCase().endsWith('left')

export const getTranslateByPlacement = (
  placement: ToastPlacement,
): {
  enter: string
  leave: string
} => {
  const translateInByPlacement: Record<ToastPlacement, string> = {
    topLeft: 'translate(-60px, -60px)',
    topRight: 'translate(60px, -60px)',
    bottomLeft: 'translate(-60px, 60px)',
    bottomRight: 'translate(60px, 60px)',
  }
  const translateOutByPlacement: Record<ToastPlacement, string> = {
    topLeft: 'translate(-50px, 15px) scale(0.85)',
    topRight: 'translate(50px, 15px) scale(0.85)',
    bottomLeft: 'translate(-50px, -15px) scale(0.85)',
    bottomRight: 'translate(50px, -15px) scale(0.85)',
  }
  return {
    enter: translateInByPlacement[placement],
    leave: translateOutByPlacement[placement],
  }
}
