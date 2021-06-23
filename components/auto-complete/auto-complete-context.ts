import React, { MutableRefObject } from 'react'

export interface AutoCompleteConfig {
  value?: string
  updateValue?: (val: string) => unknown
  visible?: boolean
  updateVisible?: (next: boolean) => unknown
  ref?: MutableRefObject<HTMLElement | null>
}

const defaultContext = {
  visible: false,
}

export const AutoCompleteContext = React.createContext<AutoCompleteConfig>(defaultContext)

export const useAutoCompleteContext = (): AutoCompleteConfig =>
  React.useContext<AutoCompleteConfig>(AutoCompleteContext)
