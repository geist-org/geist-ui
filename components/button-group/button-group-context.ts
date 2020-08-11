import React from 'react'
import { NormalSizes, ButtonColors, ButtonVariants } from '../utils/prop-types'

export interface ButtonGroupConfig {
  size?: NormalSizes
  type?: ButtonColors
  color?: ButtonColors
  variant?: ButtonVariants
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
