import { ZeitUIThemesPalette } from 'components/styles/themes'

export type ColorEnum = {
  [key in keyof ZeitUIThemesPalette]?: string
}

/* eslint-disable @typescript-eslint/camelcase */
const normal: ColorEnum = {
  background: 'Background',
  accents_1: 'Accent 1',
  accents_2: 'Accent 2',
  accents_3: 'Accent 3',
  accents_4: 'Accent 4',
  accents_5: 'Accent 5',
  accents_6: 'Accent 6',
  accents_7: 'Accent 7',
  accents_8: 'Accent 8',
  foreground: 'Foreground',
}
/* eslint-enable camelcase */

const error: ColorEnum = {
  errorLight: 'Light',
  error: 'Default',
  errorDark: 'Dark',
}

const success: ColorEnum = {
  successLight: 'Light',
  success: 'Default',
  successDark: 'Dark',
}

const warning: ColorEnum = {
  warningLight: 'Light',
  warning: 'Default',
  warningDark: 'Dark',
}

const highlight: ColorEnum = {
  alert: 'Alert',
  purple: 'Purple',
  violet: 'Violet',
  cyan: 'Cyan',
}

const colorsData: { [key: string]: ColorEnum } = {
  normal,
  success,
  warning,
  error,
  highlight,
}

export const getColorData = (type: string): ColorEnum => {
  const data = colorsData[type]
  return data || colorsData.normal as ColorEnum
}

export const getCurrentColor = (palette: ZeitUIThemesPalette, type: string, index: number): string => {
  if (type === 'normal') {
    if (index >= 5) return palette.background
    return palette.foreground
  }
  
  if (type === 'highlight') {
    if (index < 3) return 'white'
    return 'black'
  }
  
  return palette.background
}
