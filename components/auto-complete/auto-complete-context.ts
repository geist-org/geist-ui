import React, { MutableRefObject } from 'react'
import { NormalSizes } from '../utils/prop-types'

export interface AutoCompleteConfig {
  value?: string
  updateValue?: Function
  visible?: boolean
  updateVisible?: Function
  size?: NormalSizes
  ref?: MutableRefObject<HTMLElement | null>
}

const defaultContext = {
  visible: false,
  size: 'medium' as NormalSizes,
}

export const AutoCompleteContext = React.createContext<AutoCompleteConfig>(defaultContext)

export const useAutoCompleteContext = (): AutoCompleteConfig => React.useContext<AutoCompleteConfig>(AutoCompleteContext)
