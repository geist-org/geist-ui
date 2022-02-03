import React from 'react'
import { defaultToastLayout, ToastLayout, Toast } from '../use-toasts/use-toast'

export type UpdateToastsFunction = (fn: (toasts: Array<Toast>) => Array<Toast>) => any
export type UpdateToastsLayoutFunction = (
  fn: (layout: Required<ToastLayout>) => Required<ToastLayout>,
) => any
export type UpdateToastsIDFunction = (fn: () => string | null) => any

export interface GeistUIContextParams {
  toasts: Array<Toast>
  updateToasts: UpdateToastsFunction
  toastLayout: Required<ToastLayout>
  updateToastLayout: UpdateToastsLayoutFunction
  lastUpdateToastId: string | null
  updateLastToastId: UpdateToastsIDFunction
}

const defaultParams: GeistUIContextParams = {
  toasts: [],
  toastLayout: defaultToastLayout,
  updateToastLayout: t => t,
  updateToasts: t => t,
  lastUpdateToastId: null,
  updateLastToastId: () => null,
}

export const GeistUIContent: React.Context<GeistUIContextParams> =
  React.createContext<GeistUIContextParams>(defaultParams)

export const useGeistUIContext = (): GeistUIContextParams =>
  React.useContext<GeistUIContextParams>(GeistUIContent)
