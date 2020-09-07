import { TabVarient, TabStatus } from '../utils/prop-types'
import { CfxUIThemesPalette } from 'components/styles/themes'
const stack: TabStatus[] = ['disabled', 'active', 'hover', 'default']

export type StatusMap = {
  [key in TabStatus]?: boolean
}

export const defaultGetColor = (
  palette: CfxUIThemesPalette,
  varient: TabVarient,
  status: TabStatus,
): { color?: string; background: string } => {
  const isLine = varient === 'line'

  const colorBackgroundStyle = {
    active: {
      color: palette.cTheme5,
      background: isLine ? '' : palette.cTheme2,
    },
    hover: {
      color: palette.cTheme5,
      background: isLine ? '' : palette.cNeutral1,
    },
    default: {
      color: palette.cNeutral6,
      background: isLine ? '' : palette.cNeutral1,
    },
    disabled: {
      color: palette.cNeutral5,
      background: isLine ? '' : palette.cNeutral1,
    },
  }

  return colorBackgroundStyle[status]
}

export function reduceStatus(props: StatusMap): TabStatus {
  for (let i = 0; i <= stack.length; i++) {
    const s = stack[i]
    if (props[s]) {
      return s
    }
  }
  return 'default'
}
