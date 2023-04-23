import React from 'react'

export interface TreeConfig {
  onFileClick?: (path: string) => void
  initialExpand: boolean
  isImperative: boolean
  noSort: boolean
}

const defaultContext = {
  initialExpand: false,
  isImperative: false,
  noSort: false,
}

export const TreeContext = React.createContext<TreeConfig>(defaultContext)

export const useTreeContext = (): TreeConfig => React.useContext<TreeConfig>(TreeContext)
