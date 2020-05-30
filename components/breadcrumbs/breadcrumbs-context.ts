import React from 'react'

export interface BreadcrumbsConfig {
  separator?: string
}

const defaultContext = {}

export const BreadcrumbsContext = React.createContext<BreadcrumbsConfig>(defaultContext)

export const useBreadcrumbsContext = (): BreadcrumbsConfig =>
  React.useContext<BreadcrumbsConfig>(BreadcrumbsContext)
