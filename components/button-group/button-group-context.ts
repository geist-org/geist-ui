import React from 'react'
import { ButtonTypes } from '../utils/prop-types'

export interface ButtonGroupConfig {
  type?: ButtonTypes
  ghost?: boolean
  disabled?: boolean
  isButtonGroup: boolean
}

const defaultContext = {
  isButtonGroup: false,
  disabled: false,
}

export const ButtonGroupContext = React.createContext<ButtonGroupConfig>(defaultContext)

export const useButtonGroupContext = (): ButtonGroupConfig =>
  React.useContext<ButtonGroupConfig>(ButtonGroupContext)
