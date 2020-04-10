import React from 'react'

export interface Configs {
  onChange?: Function
  isChinese?: boolean
  updateChineseState: Function
  sidebarScrollHeight: number
  updateSidebarScrollHeight: Function
  
  tabbarFixed: boolean
  updateTabbarFixed: Function
}

export const defaultConfigs: Configs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  updateChineseState: () => {},
  
  tabbarFixed: false,
  updateTabbarFixed: () => {},
}

export const ConfigContext = React.createContext<Configs>(defaultConfigs)

export const useConfigs = (): Configs => React.useContext(ConfigContext)
