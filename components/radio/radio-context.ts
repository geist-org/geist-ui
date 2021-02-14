import React from 'react'

export interface RadioConfig {
  updateState?: (value: string | number) => void
  disabledAll: boolean
  value?: string | number
  inGroup: boolean
}

const defaultContext = {
  disabledAll: false,
  inGroup: false,
}

export const RadioContext = React.createContext<RadioConfig>(defaultContext)

export const useRadioContext = (): RadioConfig =>
  React.useContext<RadioConfig>(RadioContext)
