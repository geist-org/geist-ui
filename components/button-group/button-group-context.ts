import React from 'react'
import { NormalSizes, ButtonTypes, ButtonVariants } from '../utils/prop-types'

export interface ButtonGroupConfig {
  size?: NormalSizes
  type?: ButtonTypes
  color?: ButtonTypes
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
