import React from 'react'
import { GeistUIThemes } from 'components/styles/themes'
import { DeepPartial } from 'components/utils/types'

export interface Configs {
  onThemeChange?: (themes: DeepPartial<GeistUIThemes>) => void
  isChinese?: boolean
  updateChineseState: (state: boolean) => void
  sidebarScrollHeight: number
  updateSidebarScrollHeight: (height: number) => void

  tabbarFixed: boolean
  updateTabbarFixed: (state: boolean) => void

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
