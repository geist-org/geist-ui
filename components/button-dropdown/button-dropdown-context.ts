import React from 'react'
import { NormalTypes } from '../utils/prop-types'

export interface ButtonDropdownConfig {
  type?: NormalTypes
  auto?: boolean
  disabled?: boolean
  loading?: boolean
}

const defaultContext = {
  type: 'default' as NormalTypes,
  auto: false,
  disabled: false,
  loading: false,
}

export const ButtonDropdownContext = React.createContext<ButtonDropdownConfig>(
  defaultContext,
)

export const useButtonDropdown = (): ButtonDropdownConfig =>
  React.useContext<ButtonDropdownConfig>(ButtonDropdownContext)
