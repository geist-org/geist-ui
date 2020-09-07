import React from 'react'
import { ToastWithID } from '../use-toasts/toast-container'
import { MessageItemProps } from '../use-messages/message-item'

export type UpdateToastsFunction<T> = (fn: (toasts: Array<T>) => Array<T>) => any
export type UpdateMessagesFunction<T> = (fn: (messages: Array<T>) => Array<T>) => any

export interface CfxUIContextParams {
  messages: Array<MessageItemProps>
  updateMessages: UpdateMessagesFunction<MessageItemProps>
  toasts: Array<ToastWithID>
  toastHovering: boolean
  updateToasts: UpdateToastsFunction<ToastWithID>
  updateToastHoverStatus: Function
}

const defaultParams: CfxUIContextParams = {
  messages: [],
  updateMessages: t => t,
  toasts: [],
  toastHovering: false,
  updateToasts: t => t,
  updateToastHoverStatus: () => {},
}

export const CfxUIContent: React.Context<CfxUIContextParams> = React.createContext<
  CfxUIContextParams
>(defaultParams)

export const useCfxUIContext = (): CfxUIContextParams =>
  React.useContext<CfxUIContextParams>(CfxUIContent)
