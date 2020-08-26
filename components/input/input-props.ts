import React from 'react'
import { NormalSizes, InputColors, InputVariantTypes } from 'components/utils/prop-types'

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'> {
  variant?: InputVariantTypes
  placeholder?: string
  size?: NormalSizes
  htmlSize?: React.InputHTMLAttributes<HTMLInputElement>['size']
  color?: InputColors
  readOnly?: boolean
  disabled?: boolean
  label?: string
  labelRight?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  iconClickable?: boolean
  htmlWidth?: React.InputHTMLAttributes<HTMLInputElement>['width']
  width?: string
  className?: string
  clearable?: boolean
  onClearClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const defaultProps = {
  variant: 'line' as InputVariantTypes,
  disabled: false,
  readOnly: false,
  clearable: false,
  iconClickable: false,
  width: 'initial',
  size: 'medium' as NormalSizes,
  color: 'default' as InputColors,
  autoComplete: 'off',
  className: '',
  placeholder: '',
}
