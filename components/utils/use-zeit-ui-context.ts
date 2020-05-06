import React from 'react'
import { ToastWithID } from '../toast/toast-container'

export type UpdateToastsFunction<T> = (fn: (toasts: Array<T>) => Array<T>) => any

export interface ZeitUiContextParams {
  toasts: Array<ToastWithID>
  toastHovering: boolean
  updateToasts: UpdateToastsFunction<ToastWithID>
  updateToastHoverStatus: Function
}

const defaultParams: ZeitUiContextParams = {
  toasts: [],
  toastHovering: false,
  updateToasts: (t) => t,
  updateToastHoverStatus: () => {},
}

export const ZEITUIContent: React.Context<ZeitUiContextParams> = React.createContext<
  ZeitUiContextParams
>(defaultParams)

export const useZEITUIContext = (): ZeitUiContextParams =>
  React.useContext<ZeitUiContextParams>(ZEITUIContent)
