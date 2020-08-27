import React from 'react'

export interface ModalConfig {
  close?: () => void
}

export interface ModalHandles {
  setVisible: (visible?: boolean) => void
  getVisible: () => boolean
}

const defaultContext = {}

export const ModalContext = React.createContext<ModalConfig>(defaultContext)

export const useModalContext = (): ModalConfig => React.useContext<ModalConfig>(ModalContext)
