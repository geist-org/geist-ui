import React from 'react'
import { NormalSizes, SelectVariants } from '../utils/prop-types'

export interface SelectConfig {
  value?: string | string[]
  variant?: SelectVariants
  updateValue?: Function
  size?: NormalSizes
  disableAll?: boolean
}
export interface SelectHandles {
  setValue: (value?: string | string[]) => void
  getValue: () => string | string[] | undefined
}

const defaultContext = {
  variant: 'line' as SelectVariants,
  size: 'medium' as NormalSizes,
  disableAll: false,
}

export const SelectContext = React.createContext<SelectConfig>(defaultContext)

export const useSelectContext = (): SelectConfig => React.useContext<SelectConfig>(SelectContext)
