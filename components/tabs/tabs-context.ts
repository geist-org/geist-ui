import React, { CSSProperties } from 'react'

export type TabsInternalCellProps = {
  onClick: (value: string) => void
}

export type TabsInternalCell = React.FC<TabsInternalCellProps>

export interface TabsHeaderItem {
  value: string
  cell: TabsInternalCell
}

export interface TabsConfig {
  register?: (item: TabsHeaderItem) => void
  currentValue?: string
  inGroup: boolean
  leftSpace?: CSSProperties
}

const defaultContext = {
  inGroup: false,
}

export const TabsContext = React.createContext<TabsConfig>(defaultContext)

export const useTabsContext = (): TabsConfig => React.useContext<TabsConfig>(TabsContext)
