import React from 'react'

export interface CollapseConfig {
  values: Array<number>
  updateValues?: (currentIndex: number | undefined, nextState: boolean) => unknown
}

const defaultContext = {
  values: [],
}

export const CollapseContext = React.createContext<CollapseConfig>(defaultContext)

export const useCollapseContext = (): CollapseConfig =>
  React.useContext<CollapseConfig>(CollapseContext)
