import React, { MutableRefObject } from 'react'

export interface SelectConfig {
  value?: string | string[]
  updateValue?: (next: string | undefined) => unknown
  visible?: boolean
  updateVisible?: (next: boolean) => unknown
  disableAll?: boolean
  ref?: MutableRefObject<HTMLElement | null>
}

const defaultContext = {
  visible: false,
  disableAll: false,
}

export const SelectContext = React.createContext<SelectConfig>(defaultContext)

export const useSelectContext = (): SelectConfig =>
  React.useContext<SelectConfig>(SelectContext)
