import React, { MutableRefObject } from 'react'
import { NormalSizes } from '../utils/prop-types'

export interface SelectConfig {
  value?: string | string[]
  updateValue?: () => unknown
  visible?: boolean
  updateVisible?: () => unknown
  size?: NormalSizes
  disableAll?: boolean
  ref?: MutableRefObject<HTMLElement | null>
}

const defaultContext = {
  visible: false,
  size: 'medium' as NormalSizes,
  disableAll: false,
}

export const SelectContext = React.createContext<SelectConfig>(defaultContext)

export const useSelectContext = (): SelectConfig => React.useContext<SelectConfig>(SelectContext)
