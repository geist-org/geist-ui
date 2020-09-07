import React from 'react'
import { CfxUIThemesPalette } from '../styles/themes'
import { MessageColors } from 'components/utils/prop-types'
import AlertCircleFill from '@zeit-ui/react-icons/alertCircleFill'
import CheckInCircleFill from '@zeit-ui/react-icons/checkInCircleFill'
import InfoFill from '@zeit-ui/react-icons/infoFill'
import XCircleFill from '@zeit-ui/react-icons/xCircleFill'
import Bell from '@zeit-ui/react-icons/bell'

export interface MessageColorGroup {
  bgColor: string
  color: string
  icon: React.ReactNode
}

export const getStyles = (
  palette: CfxUIThemesPalette,
  color: MessageColors | undefined,
): MessageColorGroup => {
  const category: { [key in MessageColors]: MessageColorGroup } = {
    default: {
      color: palette.cNeutral7,
      bgColor: palette.cNeutral8,
      icon: React.createElement(Bell),
    },
    primary: {
      color: palette.cTheme5,
      bgColor: palette.cTheme0,
      icon: React.createElement(InfoFill),
    },
    success: {
      color: palette.success,
      bgColor: palette.successLight,
      icon: React.createElement(CheckInCircleFill),
    },
    warning: {
      color: palette.warning,
      bgColor: palette.warningLight,
      icon: React.createElement(AlertCircleFill),
    },
    error: {
      color: palette.error,
      bgColor: palette.errorLight,
      icon: React.createElement(XCircleFill),
    },
  }
  let result: MessageColorGroup
  if (!color) {
    result = category.default
  } else {
    result = category[color]
  }
  return result
}
