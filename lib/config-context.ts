import React from 'react'

export interface Configs {
  onChange?: Function
  isChinese?: boolean
  updateChineseState: Function
  sidebarScrollHeight: number
  updateSidebarScrollHeight: Function
}

export const defaultConfigs: Configs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  updateChineseState: () => {},
}

export const ConfigContext = React.createContext<Configs>(defaultConfigs)

export const useConfigs = (): Configs => React.useContext(ConfigContext)
