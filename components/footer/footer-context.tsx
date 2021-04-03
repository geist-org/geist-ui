import React from 'react'

export interface FooterConfigs {
  maxWidth: string
  breakPoint: string
}

const defaultContext = {
  maxWidth: '1000px',
  breakPoint: '960px',
}

export const FooterContext = React.createContext<FooterConfigs>(defaultContext)

export const useFooterContext = (): FooterConfigs =>
  React.useContext<FooterConfigs>(FooterContext)
