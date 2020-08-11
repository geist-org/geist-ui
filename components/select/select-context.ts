import React, { MutableRefObject } from 'react'
import { NormalSizes, SelectVariants } from '../utils/prop-types'

export interface SelectConfig {
  value?: string | string[]
  variant?: SelectVariants
  updateValue?: Function
  visible?: boolean
  updateVisible?: Function
  size?: NormalSizes
  disableAll?: boolean
  ref?: MutableRefObject<HTMLElement | null>
}

const defaultContext = {
  visible: false,
  variant: 'line' as SelectVariants,
  size: 'medium' as NormalSizes,
  disableAll: false,
}

export const SelectContext = React.createContext<SelectConfig>(defaultContext)

export const useSelectContext = (): SelectConfig => React.useContext<SelectConfig>(SelectContext)
