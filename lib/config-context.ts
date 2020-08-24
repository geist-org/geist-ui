import React from 'react'
import { GeistUIThemes } from 'components/styles/themes'
import { DeepPartial } from 'components/utils/types'

export interface Configs {
  onThemeChange?: Function
  isChinese?: boolean
  updateChineseState: Function
  sidebarScrollHeight: number
  updateSidebarScrollHeight: Function

  tabbarFixed: boolean
  updateTabbarFixed: Function

  customTheme: DeepPartial<GeistUIThemes>
  updateCustomTheme: (theme: DeepPartial<GeistUIThemes>) => void
}

export const defaultConfigs: Configs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  updateChineseState: () => {},

  tabbarFixed: false,
  updateTabbarFixed: () => {},

  customTheme: {},
  updateCustomTheme: () => {},
  onThemeChange: () => {},
}

export const ConfigContext = React.createContext<Configs>(defaultConfigs)

export const useConfigs = (): Configs => React.useContext(ConfigContext)
