import React from 'react'

export interface TabsLabelItem {
  value: string
  label: string | React.ReactNode
  disabled: boolean
}

export interface TabsConfig {
  register?: (item: TabsLabelItem) => void
  unregister?: (item: TabsLabelItem) => void
  currentValue?: string
  inGroup: boolean
}

const defaultContext = {
  inGroup: false,
}

export const TabsContext = React.createContext<TabsConfig>(defaultContext)

export const useTabsContext = (): TabsConfig => React.useContext<TabsConfig>(TabsContext)
