import React from 'react'

export interface FieldItem {
  value: string
  label: string
}

export interface FieldsetConfig {
  register?: (item: FieldItem) => void
  currentValue: string
  inGroup: boolean
}

const defaultContext = {
  inGroup: false,
  currentValue: '',
}

export const FieldsetContext = React.createContext<FieldsetConfig>(defaultContext)

export const useFieldset = (): FieldsetConfig => React.useContext<FieldsetConfig>(FieldsetContext)
