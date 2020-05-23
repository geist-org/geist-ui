import React from 'react'

export interface RadioConfig {
  updateState: (value: string) => void
  disabledAll: boolean
  value?: string
  inGroup: boolean
}

const defaultContext = {
  disabledAll: false,
  updateState: () => {},
  inGroup: false,
}

export const RadioContext = React.createContext<RadioConfig>(defaultContext)

export const useRadioContext = (): RadioConfig => React.useContext<RadioConfig>(RadioContext)
