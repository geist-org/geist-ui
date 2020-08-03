import React from 'react'
import { NormalSizes, InputColors, InputVariantTypes } from 'components/utils/prop-types'

export interface Props {
  variant?: InputVariantTypes
  value?: string
  initialValue?: string
  placeholder?: string
  size?: NormalSizes
  color?: InputColors
  readOnly?: boolean
  disabled?: boolean
  label?: string
  labelRight?: string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  iconClickable?: boolean
  width?: string
  className?: string
  clearable?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  autoComplete: string
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
  initialValue: '',
}
