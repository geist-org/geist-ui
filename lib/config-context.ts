import React from 'react'
import { Sides } from 'lib/components/sidebar/side-item'

export interface Configs {
  onChange?: Function
  isChinese?: boolean
  updateChineseState: Function
  sidebarScrollHeight: number
  updateSidebarScrollHeight: Function
  
  sides: Sides[]
  updateSides: Function
  
  tabbarFixed: boolean
  updateTabbarFixed: Function
}

export const defaultConfigs: Configs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  updateChineseState: () => {},

  sides: [],
  updateSides: () => {},
  
  tabbarFixed: false,
  updateTabbarFixed: () => {},
}

export const ConfigContext = React.createContext<Configs>(defaultConfigs)

export const useConfigs = (): Configs => React.useContext(ConfigContext)
