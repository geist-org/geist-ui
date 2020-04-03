import React from 'react'

export interface Configs {
  onChange?: Function
  sidebarScrollHeight: number
  updateSidebarScrollHeight: Function
}

export const defaultConfigs: Configs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
}

export const ConfigContext = React.createContext<Configs>(defaultConfigs)

export const useConfigs = (): Configs => React.useContext(ConfigContext)
