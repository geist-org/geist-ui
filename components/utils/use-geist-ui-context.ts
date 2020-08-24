import React from 'react'
import { ToastWithID } from '../use-toasts/toast-container'

export type UpdateToastsFunction<T> = (fn: (toasts: Array<T>) => Array<T>) => any

export interface GeistUIContextParams {
  toasts: Array<ToastWithID>
  toastHovering: boolean
  updateToasts: UpdateToastsFunction<ToastWithID>
  updateToastHoverStatus: Function
}

const defaultParams: GeistUIContextParams = {
  toasts: [],
  toastHovering: false,
  updateToasts: t => t,
  updateToastHoverStatus: () => {},
}

export const GeistUIContent: React.Context<GeistUIContextParams> = React.createContext<
  GeistUIContextParams
>(defaultParams)

export const useGeistUIContext = (): GeistUIContextParams =>
  React.useContext<GeistUIContextParams>(GeistUIContent)
