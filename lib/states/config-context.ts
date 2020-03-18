import React from 'react'

export interface Configs {
  onChange?: Function
  shouldScroll?: boolean
  updateShouldScroll?: Function
}

export const ConfigContext = React.createContext<Configs>({})

