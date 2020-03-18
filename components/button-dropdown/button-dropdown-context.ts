import React from 'react'
import { NormalSizes, NormalTypes } from '../utils/prop-types'

export interface ButtonDropdownConfig {
  size?: NormalSizes
  type?: NormalTypes
  auto?: boolean
  disabled?: boolean
  loading?: boolean
}

const defaultContext = {
  size: 'medium' as NormalSizes,
  type: 'default' as NormalTypes,
  auto: false,
  disabled: false,
  loading: false,
}

export const ButtonDropdownContext = React.createContext<ButtonDropdownConfig>(defaultContext)

export const useButtonDropdown = (): ButtonDropdownConfig => React.useContext<ButtonDropdownConfig>(ButtonDropdownContext)
