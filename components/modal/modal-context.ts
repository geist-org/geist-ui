import React from 'react'

export interface ModalConfig {
  close: () => void
  open: () => void
}

const defaultContext = {
  close: () => {},
  open: () => {},
}

export const ModalContext = React.createContext<ModalConfig>(defaultContext)

export const useModalContext = (): ModalConfig => React.useContext<ModalConfig>(ModalContext)
